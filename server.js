const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectDB, sequelize } = require('./Config/DB');
const path = require("path");

const app = express();
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});