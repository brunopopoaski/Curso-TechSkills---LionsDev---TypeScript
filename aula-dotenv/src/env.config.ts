import dotenv from 'dotenv';

dotenv.config();

interface IEnvConfig {
    PORT: number,
    DB_HOST: string | undefined,
    DB_PASSWORD: string | undefined
}

function validateEnvConfig(name: string): string {
    if (!process.env[name]) {
        throw new Error(`a variável de ambiente deve: ${name} deve ser definida no arquivo .env`);
    }
    return process.env[name] as string;
}

export const EnvConfig: IEnvConfig = {
    PORT: parseInt(validateEnvConfig('PORT')),
    DB_HOST: validateEnvConfig('DB_HOST'),
    DB_PASSWORD: validateEnvConfig('DB_PASSWORD')
}

console.log('variaveis carregadas:', {PORT: EnvConfig.PORT, DB_HOST: EnvConfig.DB_HOST, DB_PASSWORD: EnvConfig.DB_PASSWORD});