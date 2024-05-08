import Joi from "joi";

export const movieAddSchama = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
})
export const movieUpdateSchama = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
})