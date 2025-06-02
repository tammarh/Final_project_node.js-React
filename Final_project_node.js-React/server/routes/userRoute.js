const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const verifyJWT = require("../middleware/verifyJWT")
const verifySupervisor = require("../middleware/verifySupervisor")

router.use(verifyJWT)
router.use(verifySupervisor)

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.createUser)
router.put('/', userController.updateUser)
router.delete('/:id', userController.deleteUser)


module.exports = router;