const {Op} = require('sequelize');
const {sequelize} = require('../Config/DB');
const {User} = require('../Models/user.model');


const createUser = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const {username, email, password, confirmPassword} = req.body;

        if(!username || !email || !password || !confirmPassword){
            await transaction.rollback();
            return res.status(400).json({message : "All fields are required"});
        }

        if(password !== confirmPassword){
            await transaction.rollback();
            return res.status(400).json({message : "Passwords do not match"});
        }

        const existingUser = await User.findOne({where: {email: email.toLowerCase().trim()}});
        if(existingUser){
            await transaction.rollback();
            return res.status(409).json({message : "Email already in use"});
        }

        const newUser = await User.create({username,email,password},{transaction});
        await transaction.commit();
        return res.status(201).json({message : "User created successfully", user: {id: newUser.id, username: newUser.username, email: newUser.email}});

    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({message : "Error creating user", error: error.message});
    }
}

const getAllUsers = async (req,res) => {
    const transaction = await sequelize.transaction();
    try{
        const users = await User.findAll({transaction});
        await transaction.commit();
        return res.status(200).json({message : "Users retrieved successfully", users: users.map(user => ({id: user.id, username: user.username, email: user.email}))});
    }catch(error){
        await transaction.rollback();
        return res.status(500).json({message : "Error retrieving users", error: error.message});
    }
}

const updateUser = async (req,res) => {
    // Implementation for updating user details
    const transaction = await sequelize.transaction();
    try {
        const {id} = req.params;
        const {username, password} = req.body;
        const user = await User.findByPk(id, {transaction});
        if(!user){
            await transaction.rollback();
            return res.status(404).json({message : "User not found"});
        }
        if(username) user.username = username;
        if(password) user.password = password;
        await user.save({transaction});
        await transaction.commit();
        return res.status(200).json({message : "User updated successfully", user: {id: user.id, username: user.username, email: user.email}});

    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({message : "Error updating user", error: error.message});
    }
}

module.exports = {createUser, getAllUsers, updateUser};

