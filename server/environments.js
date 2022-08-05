require("dotenv").config({path:__dirname+ "/.env"});

exports.NODE_PORT = process.env.NODE_PORT || 4000
exports.NODE_ENV = process.env.NODE_ENV || 'development'