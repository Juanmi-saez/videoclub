const {TOKEN_SECRET} = require('../../config')
const jwt = require('jwt-simple')
const moment = require('moment')

const ensureAuthenticated = function(req,res,next) {
    if(!req.headers.authorization) {
        throw AuthError("AUTH_ERROR","Tu petición no puede ser validada")
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.decode(token, TOKEN_SECRET);

    if(payload.exp <= moment().unix()) {
        throw AuthError("AUTH_ERROR","Su sesión ha expirado vuelva a logearse");
    }
    next();
}

module.exports={
    ensureAuthenticated
}
