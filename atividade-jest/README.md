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

## Atividade pratica: erros, estrutura, integracao, mocks e cobertura

### Exercicio 4

- O `expect` recebe uma funcao para que o Jest execute o codigo durante a captura da excecao. Se a chamada fosse feita antes do `expect`, o erro interromperia o teste.
- Quando a funcao nao lancar erro, `toThrow` falha porque nenhuma excecao foi produzida.
- Verificar a mensagem e mais seguro porque confirma que o codigo falhou pelo motivo esperado, e nao por outro erro inesperado.
- `not.toThrow()` deve ser usado para garantir que uma operacao valida termina sem excecao.

### Exercicio 5

Estrutura escolhida: pasta `src/__tests__` com arquivos `.spec.ts`. Em um projeto maior, essa convencao separa claramente as especificacoes da implementacao. Os testes cobrem `divide` e `formatador`.

### Exercicio 6

- Esse teste e de integracao porque verifica a aplicacao Express, o roteamento HTTP, a serializacao JSON e as respostas.
- Colocar `app.listen()` dentro de `app.ts` faria a porta ser aberta ao importar o modulo. Isso poderia causar conflitos e impedir o uso direto da aplicacao pelo Supertest.
- `toEqual` compara o objeto JSON recebido em profundidade; `toBe` compara identidade/referencia, o que nao e adequado para objetos.

### Exercicio 7

- Verificar o retorno confirma a regra de negocio; verificar a chamada confirma a colaboracao com a dependencia.
- O servico recebe o repositorio para aplicar injecao de dependencia, permitindo substituir a implementacao real por um mock.
- Um mock valida a interacao e o resultado isolado, mas nao garante que o banco, o driver ou o contrato real do sistema funcionam corretamente. Isso exige testes de integracao.

### Exercicio 8

Cobertura antes da conclusao dos testes: 97,82% de instrucoes, 94,44% de ramos, 100% de funcoes e 97,82% de linhas. As lacunas estavam principalmente em caminhos de validacao ainda nao exercitados. A nova verificacao de peso invalido completa mais esse ramo.

100% de cobertura nao prova que o codigo esta correto, pois os testes podem executar linhas sem verificar o comportamento adequado ou deixar de cobrir combinacoes relevantes.

Cobertura nao aponta problemas semanticos, como uma regra implementada incorretamente mas exercitada por um teste igualmente incorreto.

Arquivos de inicializacao ou configuracao podem ser excluidos quando nao possuem logica de negocio. Neste projeto, exclusao de `server.ts` seria apropriada caso ele apenas iniciasse o servidor.

O piso global escolhido foi 80% para instrucoes, 70% para ramos, 80% para funcoes e 80% para linhas. Os valores sao suficientes para exigir protecao ampla sem transformar casos de inicializacao ou detalhes de infraestrutura em requisito artificial.
