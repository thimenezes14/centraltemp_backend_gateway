const app = require('express')();
const auth = require('./auth');
const perfis = require('./perfis');
const preferencias = require('./preferencias');
const banho = require("./banho");

app.use(auth);
app.use(perfis);
//app.use(preferencias);
//app.use(banho);
module.exports = app;