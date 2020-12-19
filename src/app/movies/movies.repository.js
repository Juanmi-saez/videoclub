const { mongoConnection } = require('../../common/db');

async function _getConnection(name) {
    return mongoConnection.getConnection(name);
}


async function create(movie){
    const db = await _getConnection(mongoConnection.movieCollention);
    const update= { $set: movie };
    const options = { upsert: true };
    await db.collection(mongoConnection.movieCollention).updateOne({ title: movie.title }, update,options);
}

async function deleteMovieDb(title){
    const db = await _getConnection(mongoConnection.movieCollention);
    return db.collection(mongoConnection.movieCollention).deleteOne({ title: title});
}

async function list(title,genres,page,limit){
    const skip=(page-1)*limit
    limit=limit*page
    const db = await _getConnection(mongoConnection.movieCollention);
    const query = {
        $and: [
            { title: title },
            { genre: {$in: genres}}
        ]
    };
    const movies=await db.collection(mongoConnection.movieCollention).find(query).skip(skip).limit(limit).toArray();
    return movies;
}

module.exports={
    create,
    deleteMovieDb,
    list
}
