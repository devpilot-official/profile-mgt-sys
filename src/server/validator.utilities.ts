import joi from '@hapi/joi';

export const isAccountNumber = joi
  .string()
  .trim()
  .regex(/\d+/)
  .length(10);

export const isQuery = joi.object({
  fresh: joi.bool().default(true)
});

export const isEmail = joi
  .string()
  .trim()
  .regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
