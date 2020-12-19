const GenericError = require('./GenericError');

class NotFound extends GenericError {
  constructor(code, message) {
    super(409, code, message, null);
  }
}


module.exports = NotFound;
