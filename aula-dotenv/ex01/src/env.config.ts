import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface IEnvConfig {
  PORT: number;
  DB_HOST: string;
  DB_PASSWORD: string;
  API_KEY: string;
}

const env = process.env.NODE_ENV ?? 'dev';
const allowedEnvs = new Set(['dev', 'prod']);

if (!allowedEnvs.has(env)) {
  throw new Error(`o ambiente ${env} não é válido; use dev ou prod`);
}

dotenv.config({
  path: path.resolve(__dirname, '..', `.env.${env}`),
  override: false,
});

function required(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`a variável de ambiente ${name} é obrigatória`);
  }

  return value;
}

const rawPort = Number(process.env.PORT ?? 3000);

if (!Number.isInteger(rawPort) || rawPort < 1 || rawPort > 65535) {
  throw new Error('PORT deve ser um número inteiro entre 1 e 65535');
}

export const EnvConfig: IEnvConfig = {
  PORT: rawPort,
  DB_HOST: required('DB_HOST'),
  DB_PASSWORD: required('DB_PASSWORD'),
  API_KEY: required('API_KEY'),
};

console.log('ambiente:', env, 'banco:', EnvConfig.DB_HOST);