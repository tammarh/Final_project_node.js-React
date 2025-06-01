const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')
const verifyJWT = require("../middleware/verifyJWT")
const verifySupervisor = require("../middleware/verifySupervisor")

 router.use(verifyJWT)

router.get('/', verifySupervisor, userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/',verifySupervisor, userController.createUser)
router.put('/',verifySupervisor, userController.updateUser)
router.delete('/:id', verifySupervisor,userController.deleteUser)


module.exports = router;