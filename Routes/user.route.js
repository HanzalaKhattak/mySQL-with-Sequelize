const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const {createUser} = require('../Controllers/user.controller');


router.post('/register', createUser);

module.exports = router;
