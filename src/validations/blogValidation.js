import Joi from 'joi';

const blogValidationSChema = Joi.object ({

    title: Joi.string().required().label("Title").regex(/^[A-Za-z ]+$/).messages({
        "string.pattern.base": "The titles can not include numbers and special characters",
        "any.required": "The title field can not be empty"
    }),
    content: Joi.string().required().label("content").messages({
      "any.required": "The content field can not be empty"
  }),

  image: Joi.string().messages({
    "any.required": "The image field can not be empty"
}),

})

export default  blogValidationSChema;