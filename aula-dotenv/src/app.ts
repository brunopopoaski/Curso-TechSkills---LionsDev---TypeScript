import { host } from './database.js';
import dotenv from 'dotenv';
import { EnvConfig} from './env.config.js';

dotenv.config();
console.log('variaveis carregadas:', process.env);
console.log('porta + 1:', EnvConfig.PORT);
console.log('host do banco:', host); 