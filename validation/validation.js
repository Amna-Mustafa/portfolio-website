const Joi = require("joi");

const loginValidation = (usr) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(8).max(200).required(),
  });
  return schema.validate(usr);
};
module.exports = {
    loginValidation,
};