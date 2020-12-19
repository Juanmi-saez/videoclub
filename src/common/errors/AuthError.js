const GenericError = require('./GenericError');

class NotFound extends GenericError {
  constructor(code, message) {
    super(403, code, message, null);
  }
}


module.exports = NotFound;
