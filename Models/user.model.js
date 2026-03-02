const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../Config/DB');
const bcrypt = require('bcrypt');

class User extends Model {
    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    };
}

User.init({
    id:{
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [3,100]
        }
    },
    email:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
        set(value){
            this.setDataValue('email', value ? value.toLowerCase().trim() : value);
        }
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [6,255]
        }
    }
},
{
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks:{
        beforeCreate: async (user) => {
            if (user.password){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    },
    indexes:[
        {unique: true, fields: ['email']},

    ],
    defaultScope: {
        attributes: {exclude: ['password']}
    }
});

module.exports = {User};