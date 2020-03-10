const {Model, DataTypes} = require('sequelize');

class Auth extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            senha: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'auth',
        })
    }

    static associate(models) {

    }
}

module.exports = Auth;