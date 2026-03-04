const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectDB, sequelize } = require('./Config/DB');
const userRoutes = require('./Routes/user.route');
const path = require("path");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const initializeDB = async ()=> {
    await connectDB();
    console.log('Database connected and synchronized');
}

app.use('/api/users', userRoutes);

const startServer = async () => {
    await initializeDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port "http://localhost:${PORT}"`);
    });
};

startServer();