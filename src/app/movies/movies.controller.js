const service = require('./movies.service')

function create(req,res,next){
    service.createMovie(req)
        .then(() => res.status(204).json())
        .catch(err => next(err))
}

function deleteMovie(req,res,next){
    service.deleteMovie(req.params.title)
        .then(() => res.status(204).json())
        .catch(err => next(err))
}
function listMovies(req,res,next){
    service.listMovies(req.query.title, req.query.genre,req.query.page,req.query.limit)
        .then((movies) =>
            res.status(201).json(movies)
        )
        .catch(err => next(err))
}

module.exports={
    create,
    deleteMovie,
    listMovies
}
