const GenericError = require('./GenericError');

class NotFound extends GenericError {
  constructor(message) {
    super(400, 'INVALID_PARAMETERS', message, null);
  }
}


module.exports = NotFound;
