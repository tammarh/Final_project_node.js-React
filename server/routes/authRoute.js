const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const verifyJWT = require("../middlewere/verifyJWT")

router.use(verifyJWT)

router.post("/login", authController.login)
router.post("/register", authController.register)

module.exports = router