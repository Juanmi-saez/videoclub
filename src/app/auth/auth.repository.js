const { mongoConnection } = require('../../common/db');

async function _getConnection(name) {
    return mongoConnection.getConnection(name);
}


async function registerUser(user){
    const db = await _getConnection(mongoConnection.authCollection);
    const update= { $set: user };
    const options = { upsert: true };
    await db.collection(mongoConnection.authCollection).updateOne({ email: user.email }, update,options);
}

async function getUser(email){
    const db = await _getConnection(mongoConnection.authCollection);
    const query = {
        $and: [
            { email: email },
        ]
    };
    const user = await db.collection(mongoConnection.authCollection).findOne(query);
    return user;
}

async function getUserAndPassword(email,password){
    const db = await _getConnection(mongoConnection.authCollection);
    const query = {
        $and: [
            { email: email },
            { password: password },
        ]
    };
    const userDb = await db.collection(mongoConnection.authCollection).findOne(query);
    return userDb;
}


module.exports={
    registerUser,
    getUser,
    getUserAndPassword
}
