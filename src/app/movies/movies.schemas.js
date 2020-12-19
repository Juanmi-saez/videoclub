const Joi = require('joi');

const create={
    params:{
        title: Joi.string().required(),
        description: Joi.string().required(),
        genre:Joi.string().valid("horror","drama","comedy","action").required()
    }
}

const deleteSchema={
    params:{
        title: Joi.string().required()
    }
}

const listSchema={
    query:{
        title:Joi.string().required(),
        page:Joi.number().integer().min(1).required(),
        limit:Joi.number().integer().min(1).required(),
        genre:Joi.array().items(Joi.string())
    }
}

module.exports={
    create,
    deleteSchema,
    listSchema
}
