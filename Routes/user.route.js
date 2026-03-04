const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const {createUser, getAllUsers, updateUser } = require('../Controllers/user.controller');


router.post('/register', createUser);
router.get('/getAllUsers', getAllUsers);
router.put('/updateUser/:id', updateUser);
module.exports = router;
