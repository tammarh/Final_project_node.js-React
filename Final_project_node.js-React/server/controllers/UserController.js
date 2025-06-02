const User = require('../models/User');
const bcrypt = require('bcrypt')
const getAllUsers = async (req, res) => {

    const users = await User.find().lean()
    if(!users ) {
        return res.status(404).json({ message: 'No users found' })
    }
    res.status(200).json(users);
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ message: 'User ID is required' })
    }
    const user = await User.findById(id).lean()
    if(!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user);
}

const createUser = async (req, res) => {
    const { username, password, name, email, rolse , isTeacher , HourOfTeacher} = req.body;
    if(!username || !password || !name || !email ) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const existingUser = await User.findOne({ username }).lean()
    if(existingUser) {
        return res.status(409).json({ message: 'Username already exists' })
    }
    const hashPwd = await bcrypt.hash(password, 10)
    const user = await User.create({ username, password : hashPwd, name, email, rolse,active:true, isTeacher , HourOfTeacher })
    if(!user) {
        return res.status(500).json({ message: 'Error creating user' })
    }
    res.status(201).json(user);
}
const updateUser = async (req, res) => {
    const { id , username, password, name, email, role, active , isTeacher , HourOfTeacher} = req.body;
    if(!id) {
        return res.status(400).json({ message: 'User ID is required' })
    }
    const user = await User.findById(id)
    if(!user) {
        return res.status(404).json({ message: ' not found User to update' })
    }
    const existsingUser = await User.findOne({ username })
    if(!existsingUser) {
        user.username = username
    }
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }
    if(name) {
        user.name = name
    }
    if(email) {
        user.email = email
    }
    if(role) {
        user.role = role
    }
    
    if(active) {
        user.active = active
    }
    if(isTeacher) {
        user.isTeacher = isTeacher
    }
    if(HourOfTeacher) {
        user.HourOfTeacher = HourOfTeacher
    }
    const updatedUser = await user.save()
    res.status(200).json(user);
}
const deleteUser = async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({ message: 'User ID is required' })
    }
    const user = await User.findByIdAndDelete(id)
    if(!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' });
}

module.exports = { getAllUsers , getUserById , createUser , updateUser, deleteUser}