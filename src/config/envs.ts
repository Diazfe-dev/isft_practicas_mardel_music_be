import dotenv from 'dotenv';

import * as joi from 'joi';

dotenv.config();

const envSchema = joi.object({
    PORT: joi.number().default(3000),
}).unknown();

const { error, value: env } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envConfig = {
    port: env.PORT,
}

export default envConfig;