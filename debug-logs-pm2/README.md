# Diagnóstico de logs, middleware e PM2

Este projeto foi montado para praticar a investigação de problemas reais em Node.js + TypeScript usando logs estruturados, middleware de requisição e PM2.

A ideia foi reproduzir falhas comuns e corrigir cada uma pela causa raiz, não apenas pela aparência do problema.

## Objetivo

O projeto demonstra três tipos de falha que aparecem em aplicações reais:

- logger com nível e estrutura inadequados
- middleware registrando status e tempo no momento errado
- exceção assíncrona que escapa do contexto do Express e pode ser mascarada pelo PM2

---

## 1) Problema no logger

### Sintoma
As mensagens de início e fim do processamento não apareciam como deveriam, e quando apareciam faltavam informações importantes.

### Causa
O logger estava configurado com nível fixo e sem formatação adequada. Além disso, as mensagens eram emitidas sem metadados estruturados, o que tornava a leitura menos útil e dificultava diagnóstico.

Também faltava um bloco `try/catch/finally`, então o caminho de erro não registrava o fim do processamento com consistência.

### Correção
- o nível foi lido da variável de ambiente `LOG_LEVEL`
- o timestamp foi adicionado pelo próprio formatter do Winston
- os erros passaram a ser registrados como objeto estruturado com stack
- os dados sensíveis foram removidos antes do log
- o log final foi garantido mesmo quando a execução falhava

### Evidência
A aplicação compilou com sucesso com o comando:

```bash
npm run build
```

E a aplicação subiu corretamente e gerou um log de inicialização:

```text
2026-09-16T20:18:49.481-03:00 INFO server started port: 3011
```

---

## 2) Problema no middleware de requisição

### Sintoma
O middleware registrava o status e a duração errados. Em todos os casos, o status parecia estar no valor inicial e a duração vinha quase em zero.

### Causa
O log estava sendo emitido antes do fim da resposta. Isso fazia com que `res.statusCode` ainda estivesse no valor anterior e a duração fosse calculada cedo demais.

Além disso, o middleware foi registrado depois das rotas, então ele não era executado antes dos handlers.

### Correção
- o log foi movido para o evento `finish` da resposta
- a duração foi medida com `process.hrtime.bigint()`
- o middleware foi colocado antes das rotas
- foi incluído um `requestId` para correlacionar todas as linhas de uma mesma requisição

### Evidência
Requisições reais foram feitas com sucesso para:

- `/health` → `200 OK`
- `/users/42` → `200 OK`
- `/erro` → `500 Internal Server Error`

Resposta real do endpoint:

```text
StatusCode        : 200
StatusDescription : OK
```

O campo de correlação também foi observado no header da resposta:

```text
X-Request-Id: bbec32f2-50fc-420f-a7fe-b979d967f03a
```

---

## 3) Problema com PM2 e exceção assíncrona

### Sintoma
A aplicação parecia funcionar até um ponto, mas uma exceção assíncrona podia derrubar o processo. O PM2 reiniciava o processo automaticamente, o que pode esconder a falha real se alguém olhar apenas o endpoint.

### Causa
A exceção foi disparada dentro de um `setTimeout`, fora do fluxo do Express. Isso significa que o middleware de tratamento de erro do Express não captura esse erro.

### Correção
- tratar o erro no próprio fluxo assíncrono
- evitar `throw` dentro de callback sem tratamento
- usar `await` e rejeição controlada quando necessário
- configurar o PM2 com um script explicitamente compilado e porta definida

### Observação importante
Esse é um caso clássico de erro assíncrono: o Express não consegue interceptar uma exceção lançada fora do ciclo de requisição.

---

## Conclusão

Os problemas não estavam espalhados de forma aleatória. Cada um tinha uma causa bem clara:

- logger: nível e estrutura errados
- middleware: momento errado do log e ordem errada na cadeia
- PM2: exceção assíncrona fora do contexto do Express

A correção foi validada com build e execução real, e o diagnóstico ficou alinhado com a prática profissional de observabilidade em Node.js.

---

## Arquivos principais

- `src/logger.ts`
- `src/requestLogger.ts`
- `src/server.ts`
- `ecosystem.config.js`

Este projeto serve como exemplo prático de como investigar falhas observáveis em aplicação Node.js sem improvisar solução por tentativa e erro.
