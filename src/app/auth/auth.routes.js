const validator = require('express-joi-validation')({ passError: true });
const controller = require('./auth.controller')
const schemas = require('./auth.schemas')

const joiNoConvertconfig = { joi: { convert: false, allowUnknown: true } };

function register(app) {
    app.post(
        '/user/signUp',
        validator.body(schemas.singUpUser.body,joiNoConvertconfig),
        controller.singUpUser
    );
    app.get(
        '/user/login/:email/:password',
        validator.params(schemas.logIn.params),
        controller.logIn
    );
}


module.exports={
    register
}
