const { authRoutes } = require('../app/auth');
const { moviesRoutes } = require('../app/movies');

function init(app) {
  authRoutes.register(app);
  moviesRoutes.register(app);
}

module.exports = { init };
