const User = require('../models/User');

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

const updateUser = async (req, res) => {
    const { id} = req.params;
    if(!id) {
        return res.status(400).json({ message: 'User ID is required' })
    }
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).lean()
    if(!user) {
        return res.status(404).json({ message: 'User not found' })
    }
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

module.exports = { getAllUsers , getUserById , updateUser, deleteUser}