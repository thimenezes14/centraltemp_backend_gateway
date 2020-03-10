const express = require('express');
const router = express.Router();
const validacaoCadastro = require('../helpers/listaErros');
const authController = require('../controllers/auth');
const checkToken = require('../middlewares/verifyToken');
const pathName = '/auth';

router.get(`${pathName}/usuarios`, authController.listarUsuarios);

router.post(`${pathName}/novo`, validacaoCadastro, authController.criarPerfil);
router.post(`${pathName}/login`, authController.login);

router.patch(`${pathName}/:id/atualizar`, checkToken, authController.atualizar);

module.exports = router;