import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.required().default(3001),
    DEFAULT_LIMIT: Joi.number().default(5)
});