const express = require("express")
const router = express.Router()
const PersonalBasketStudent = require("../models/PersonalBasketStudent");
const PersonalBasketStudentController = require("../controllers/PersonalBasketStudentController")

router.get("/", PersonalBasketStudentController.getAllBasketStudent)
router.post("/", PersonalBasketStudentController.createNewBasketStudent)
router.get("/byId", PersonalBasketStudentController.getBasketStudentById)
router.get("/sortby", PersonalBasketStudentController.getStudentSortByDisability)
// router.put("/", PersonalBasketStudentController.updateBasketStudent)
// router.delete("/", PersonalBasketStudentController.deleteBasketStudent)

module.exports = router