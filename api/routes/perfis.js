const app = require('express')();
const perfilApi = require('../services/perfilApi');

app.get('/perfis', async (req, res, next) => {
    try {
        const response = await perfilApi.get('/');
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json(err.response.data);
    }
})

app.get('/perfis/listar', async (req, res, next) => {
    try {
        const response = await perfilApi.get('/listar');
        return res.status(200).json(response.data);
    } catch (err) {
        return res.status(500).json(err.response.data);
    }
});

module.exports = app;