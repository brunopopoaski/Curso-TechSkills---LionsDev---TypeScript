# Atividades Praticas - Testes Automatizados com Jest

## Atividade 1: tipos de teste

### Situacoes

| Situacao | Tipo | Justificativa |
|---|---|---|
| c. Simular o usuario entrando, adicionando produtos, fazendo login e concluindo a compra | End-to-end | Percorre a interface, varios modulos e uma jornada completa do usuario. |
| d. Verificar se, apos a compra, o sistema dispara uma requisicao HTTP para o servico de e-mail | Integracao | Testa a comunicacao entre o pedido concluido e outro sistema externo. |
| e. Testar se `aplicarCupom()` devolve o total com o desconto correto | Unitario | Avalia uma funcao isolada, com entradas e saida deterministicas. |
| f. Verificar se `POST /pedidos` responde 201 e devolve o pedido criado | Integracao | Testa a rota, a camada da aplicacao e possivelmente seus contratos, com a API como fronteira. |

### Piramide de testes

| Nivel | Tipo de teste | Quantidade relativa | Custo |
|---|---|---:|---:|
| Topo | End-to-end | Menor | Alto |
| Meio | Integracao | Intermediaria | Medio |
| Base | Unitario | Maior | Baixo |

A base e mais larga porque testes unitarios sao rapidos, baratos e numerosos. Eles detectam rapidamente erros localizados. Testes de integracao e end-to-end sao mais caros, lentos e menos numerosos, mas sao necessarios para validar contratos entre componentes e fluxos completos.

### Respostas escritas

**O que sao testes automatizados?** Sao verificacoes escritas em codigo que executam comportamentos esperados sem depender inteiramente da execucao manual. Eles diferem do teste manual por serem repetiveis, rapidos e mais facil de executar em cada alteracao.

**O que e uma regressao?** E quando uma nova alteracao quebra um comportamento que antes funcionava. Os testes evitam regressao ao preservar as expectativas do sistema e sinalizar a falha automaticamente.

**Analogia da orquestra:** Em um teste unitario, cada instrumento pode ser testado sozinho para confirmar que funciona corretamente. Em um teste de integracao, varios instrumentos tocam juntos para verificar se o ensaio combinado produz o resultado esperado.

**Dois beneficios no ciclo de vida:** Deteccao antecipada de defeitos e maior seguranca para refatorar e evoluir o codigo.

**Qualidade no processo:** Qualidade nao pode depender apenas da etapa final, pois corrigir problemas cedo reduz retrabalho, custo e risco. Ela precisa orientar requisitos, desenvolvimento, revisao e entrega continua.

### Caso para discutir

O teste unitario da regra de desconto teria encontrado o problema primeiro, especialmente se o teste cobrisse a integracao entre calculo do total e cupom. Ele deveria ser executado antes da entrega, no feedback rapido do desenvolvedor, em commits e no pipeline de CI. Alem de corrigir o bug, a equipe deve criar ou ajustar o teste que o reproduz, revisar casos semelhantes, fazer uma revisao de regressao e registrar/acompanhar o incidente.

## Atividade 2: estrutura e perguntas

Escolhi colocar os testes ao lado do codigo com o padrao `.spec.ts`. Isso torna simples localizar os testes e manter a proximidade entre cada unidade e sua especificacao.

- **ts-jest:** compila arquivos TypeScript e permite que o Jest os execute.
- **testEnvironment `node`:** este projeto testa funcoes Node/TypeScript, sem APIs de navegador. `jsdom` seria adequado para codigo e DOM do navegador.
- **__tests__ ou `.spec.ts`:** a pasta `__tests__` agrupa testes separadamente, enquanto `.spec.ts` ao lado do codigo oferece proximidade e descoberta por convencao; ambos funcionam automaticamente.
- **Arquivo apenas `sum.ts`:** o Jest nao o reconheceria como teste, a menos que houvesse outro padrao configurado.

## Atividade 3

O projeto inclui `subtract`, testes com AAA, `montarOperacao` com varios matchers e o desafio opcional de calculo de frete.

### Comandos

```sh
npm install
npm test
```

### Saida esperada

```text
PASS src/sum.spec.ts
PASS src/subtract.spec.ts
PASS src/operation.spec.ts
PASS src/shipping.spec.ts

Test Suites: 4 passed, 4 total
Tests: 15 passed, 15 total
```
