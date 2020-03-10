const Sequelize = require('sequelize');
const db = require('../config/database');

const Auth = require('../api/models/auth');
const conn = new Sequelize(db);

Auth.init(conn);

module.exports = conn;