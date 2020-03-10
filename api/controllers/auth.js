const sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth');
const { validationResult } = require('express-validator');
const gerarHash = require('../helpers/obterHash');

module.exports = {

    async listarUsuarios(req, res) {
        Auth.findAll({attributes: ['id']})
            .then((listaUsuarios) => { return res.status(200).json(listaUsuarios) })
            .catch((error) => { return res.status(500).json({ err: "Erro ao tentar listar perfis. " + error}) });
    },

    async criarPerfil(req, res) {
        const { senha } = req.body;

        if (!senha)
            return res.status(400).json({ err: "Forneça todas as credenciais para acesso! " });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ err: errors.array().map(item => { return item.msg }) });
        }

        gerarHash(senha, hash => {
            Auth.create({ senha: hash })
                .then(() => {
                    return res.status(201).send("Criado");
                })
                .catch(err => {
                    return res.status(500).send(err);
                })
        });
    },

    async login(req, res) {
        const { id, senha } = req.body;

        if (!id || !senha)
            return res.status(400).json({ err: "Forneça todas as credenciais para acesso! " });

        Auth.findOne({
            attributes: ['id', 'senha'],
            where: { id }
        })
            .then(auth => {

                bcrypt.compare(senha, auth.senha, (err, isMatch) => {
                    if (err || !isMatch)
                        return res.status(401).json({ err: "Credenciais incorretas" });

                    const token = jwt.sign({
                        id: auth.id
                    },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "10m"
                        }
                    );

                    return res.status(200).json({token});
                });
            })
            .catch((err) => { console.log(err); return res.status(500).json({ err: "Erro ao tentar autenticar. " }) })
    },

    async atualizar(req, res) {
        const token = res.locals.token.id;
        const { id } = req.params;

        if (!id)
            return res.status(400).json({ err: "Necessário ID para alteração." });

        if (id !== token)
            return res.status(403).json({ err: "Você não tem autorização para esta ação. " });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ err: errors.array().map(item => { return item.msg }) });
        }

        gerarHash(req.body.senha, hash => {
            Auth.update({ senha: hash }, { where: { id } })
                .then(() => { return res.status(200).json({}) })
                .catch(() => { return res.status(500).json({ err: "Erro ao tentar salvar perfil." }) })
        });
    }
}