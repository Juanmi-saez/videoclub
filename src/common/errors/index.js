const Conflict = require('./Conflict');
const GenericError = require('./GenericError');
const AuthError = require('./AuthError')
const InvalidParams = require('./InvalidParams')

module.exports = {
  GenericError,
  Conflict,
  AuthError,
  InvalidParams
};
