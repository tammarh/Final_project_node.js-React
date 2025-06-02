const express = require("express")
const router = express.Router()
const TeachersDetailsController = require("../controllers/teachersDetailsController")

router.get("/", TeachersDetailsController.getAllTeachers)
router.post("/", TeachersDetailsController.createTeacher)
router.get('/institution/:institutionId', TeachersDetailsController.getTeachersByInstitution);

module.exports = router