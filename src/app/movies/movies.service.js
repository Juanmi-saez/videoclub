const {create,deleteMovieDb,list} = require('./movies.repository')
const mongodb= require("mongodb");

async function createMovie(req){
 const movie={
         title: req.params.title,
         description: req.params.description,
         genre:req.params.genre,
         poster:{
             name: req.file.originalname,
             binary: new mongodb.Binary(req.file.buffer)
         }
 }
 await create(movie);
}


async function deleteMovie(title){
    await deleteMovieDb(title);
}

async function listMovies(title,genres,page,limit){
    const movies=await list(title,genres,page,limit)
    return movies;
}

module.exports={
    createMovie,
    deleteMovie,
    listMovies
}
