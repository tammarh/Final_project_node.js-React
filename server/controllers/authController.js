const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const user = await User.findOne({ username }).exec()
    if(!user || !user.active) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const UserInfo = {
        _id : user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        rolse: user.rolse        
    }
    const token = jwt.sign(UserInfo,process.env.ACCESS_TOKEN_SECRET)

    res.json({token})




}
const register = async (req, res) => {
    const { username, password, name, email } = req.body
    if (!username || !password || !name || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const userObject = await User.create({ username, password: hashPassword, name, email })
    if (!userObject) {
        return res.status(400).json({ message: 'Invalid user data received' })
    }
    res.status(201).json({ message: `New user ${username} created` })

}
module.exports = { login, register }