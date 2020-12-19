const { GenericError, InvalidParams } = require('../common/errors');

const unknownError = 'UNKNOWN_ERROR';

module.exports = {
  init: (app) => {
    app.use((err, req, res, next) => {
      if (err.error && err.error.isJoi) {
        next(new InvalidParams(`Invalid ${err.type}: ${err.error}`));
      } else {
        next(err);
      }
    });

    app.use((err, req, res, next) => {
      const { message, exception } = _buildMessage(req, err);

      if (err instanceof GenericError) {
        res.status(err.statusCode).json(err.toJson());
      } else {
        res.status(500).json({ CODE: unknownError,message });
      }
    });
  },
};

function _buildMessage(req, err) {
  const params = {
    method: req.method,
    url: req.url,
    body: req.body
  };

  if (err instanceof GenericError) {
    params.errorMessage = err.toJson();
  } else {
    params.errorMessage = err;
  }

  const message = JSON.stringify(params, null, 4);

  let exception;
  if (err.exception) {
    exception = err.exception;
  } else {
    exception = err;
  }

  return { message, exception };
}
