const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const initializers = require('./initializers');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const init = () => {

  initializers.routes.init(app);
  initializers.errorHandler.init(app);

  const server = app.listen(config.PORT, () => {
    console.log(`${config.APPNAME} at ${config.PORT} Started!`);
  });

  server.on('close', () => {
    console.log(`service closed`)
  });
};

module.exports = { init, conf: app };
