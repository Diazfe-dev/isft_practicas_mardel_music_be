import dotenv from 'dotenv';

import * as joi from 'joi';

dotenv.config();

const envSchema = joi.object({
    PORT: joi.number().default(3000),
    MYSQL_HOST: joi.string().default('localhost'),
    MYSQL_USER: joi.string().default('root'),
    MYSQL_PASSWORD: joi.string().default('root'),
    MYSQL_DATABASE: joi.string().default('database'),
}).unknown();

const { error, value: env } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envConfig = {
    port: env.PORT,
    mysql: {
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASSWORD,
        database: env.MYSQL_DATABASE,
    }
}

export default envConfig;