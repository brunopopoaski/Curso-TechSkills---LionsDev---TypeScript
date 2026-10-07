import { EnvConfig } from './env.config.ts';

export const host = EnvConfig.DB_HOST;
console.log('host do banco:', host);