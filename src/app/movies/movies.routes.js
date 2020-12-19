const validator = require('express-joi-validation')({ passError: true });
const controller = require('./movies.controller')
const schemas = require('./movies.schemas')
const {ensureAuthenticated} = require('../../common/middleware')
const multer  = require('multer')
const upload = multer()

function register(app) {
    app.post(
        '/movies/create/:title/:description/:genre',
        validator.params(schemas.create.params),
        upload.single('image'),
        ensureAuthenticated,
        controller.create
    );
    app.delete(
        '/movies/:title',
        validator.params(schemas.deleteSchema.params),
        ensureAuthenticated,
        controller.deleteMovie
    );
    app.get(
        '/movies',
        validator.query(schemas.listSchema.query),
        controller.listMovies
    );
}


module.exports={
    register
}
