module.exports = {
    APPNAME:'videoclub',
    PORT:'3000',
    TOKEN_SECRET: process.env.TOKEN_SECRET || "ce3ff963-39a4-4a9a-ad35-cac22dbdf5a0",
    DB_CONNECTION:'mongodb://localhost:27017',
    DB_DATABASE: 'catalog'
};
