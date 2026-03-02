const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host : 'localhost',
        dialect : 'mysql'
    }
);

const connectDB = async () => {
    try{
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    if (process.env.NODE_ENV !== 'production') {
            // await sequelize.sync({ alter: true });
            console.log('Database synchronized');
        }
}catch(error){
    console.error('Unable to connect to the database:', error);
    process.exit(1);
}
};

module.exports = { sequelize, connectDB };