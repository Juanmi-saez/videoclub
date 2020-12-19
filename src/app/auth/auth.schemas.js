const Joi = require('joi');
const emailSchema = Joi.string().email({ minDomainAtoms: 2 }).required();
const passwordSchema = Joi.string().min(3).max(50);

const singUpUser={
    body:{
        user: {
            email: emailSchema,
            password: passwordSchema
        }
    }
}

const logIn={
    params:{
        email: emailSchema,
        password:passwordSchema
    }
}

module.exports={
    singUpUser,
    logIn
}
