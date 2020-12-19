class GenericError extends Error {
  constructor(statusCode, code, errorMessage, exception) {
    super(errorMessage);
    this.statusCode = statusCode;
    this.code = code;
    this.message = errorMessage;
    this.exception = exception;
  }

  toJson() {
    const response = {
      CODE: this.code
    };

    if (this.message) {
      response.message = this.message;
    }

    return response;
  }
}

module.exports = GenericError;
