const {check} = require('express-validator');

module.exports = [
    check('senha')
        .matches(/^[0-9]{4}$/)
        .withMessage('Por favor, forneça uma senha numérica de 4 dígitos. ')
]