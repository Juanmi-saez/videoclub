const authRepository= require('./auth.repository')
const moment = require('moment')
const jwt = require('jwt-simple');
const {Conflict} =require('../../common/errors')
const {TOKEN_SECRET} = require('../../config')

function createToken(user){
    var payload = {
        sub: user.email, iat: moment().unix(), exp: moment().add(1, "days").unix(),
    };
    return jwt.encode(payload, TOKEN_SECRET);
}

async function emailSingup(user){
    //Comprobamos si ya exite el usuaruo
   const userDb= await authRepository.getUser(user.email);
   if(userDb == null){
       throw new Conflict('USER_ALREADY_EXIST', `The email ${user.email} already exist`);
   }
    //se podría comprobar si la contraseña tiene un formato correcto
    await authRepository.registerUser(user)
    //asignar token al usuario para su autorización
    return createToken(user)
}

async function emailLogIn(email, password){
    const userDb = await authRepository.getUserAndPassword(email,password)
    if(userDb == null){
        throw new Conflict('USER_NOT_EXIST', `your username and password are incorrect`);
    }
    return createToken(userDb)
}



module.exports={
    emailSingup,
    emailLogIn
}
