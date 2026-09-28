import fs from 'node:fs/promises';

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

type ConfigValue = Record<string, unknown>;

async function readConfig(path: string): Promise<ConfigValue> {
  try {
    const content = await fs.readFile(path, 'utf-8');

    try {
      return JSON.parse(content) as ConfigValue;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'conteúdo inválido';
      throw new AppError(`JSON inválido em ${path}: ${message}`, 422);
    }
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      throw new AppError(`Configuração não encontrada: ${path}`, 404);
    }

    console.error('erro inesperado ao carregar config', error);
    throw error;
  }
}

function retryLaterUnsafe(): void {
  setTimeout(() => {
    throw new Error('tentativa de releitura falhou');
  }, 200);
}

async function runMissingFileScenario(): Promise<void> {
  console.log('\n--- cenário: arquivo inexistente ---');
  try {
    const config = await readConfig('./config/nao-existe.json');
    console.log('config carregada', config);
  } catch (error) {
    console.error('catch capturou erro do arquivo ausente', error);
  }
}

async function runInvalidJsonScenario(): Promise<void> {
  console.log('\n--- cenário: JSON inválido ---');
  try {
    const config = await readConfig('./config/invalid.json');
    console.log('config carregada', config);
  } catch (error) {
    console.error('catch capturou erro de parse', error);
  }
}

async function runFetchScenarios(): Promise<void> {
  const scenarios = [
    { label: 'host inexistente', url: 'https://does-not-exist.invalid/' },
    { label: 'resposta 404', url: 'https://httpbin.org/status/404' },
  ];

  for (const scenario of scenarios) {
    console.log(`\n--- cenário: ${scenario.label} ---`);

    try {
      const response = await fetch(scenario.url);
      console.log('status HTTP', response.status, 'ok?', response.ok);

      if (!response.ok) {
        console.log('tratando resposta HTTP de erro sem rejeitar promise');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('fetch rejeitou por falha de rede', error.stack ?? error.message);
      } else {
        console.error('fetch rejeitou por erro desconhecido', error);
      }
    }
  }
}

process.on('unhandledRejection', (reason: unknown) => {
  console.error('unhandledRejection detectada', reason);
});

async function main(): Promise<void> {
  console.log('demonstração do exercício 7');
  console.log('observação: o erro dentro de setTimeout é síncrono e derruba o processo');
  retryLaterUnsafe();

  try {
    await fs.writeFile('./config/valid.json', JSON.stringify({ app: 'techskills', version: 1 }), 'utf-8');
    const validConfig = await readConfig('./config/valid.json');
    console.log('config válida', validConfig);
  } catch (error) {
    console.error('erro inesperado no cenário válido', error);
  }

  await runMissingFileScenario();
  await runInvalidJsonScenario();
  await runFetchScenarios();
}

main().catch((error: unknown) => {
  console.error('falha final do exercício 7', error);
  process.exitCode = 1;
});
