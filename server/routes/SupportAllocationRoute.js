const express = require("express")
const router = express.Router()
const SupportAllocationController = require("../controllers/SupportAllocationController")
router.get("/:id", SupportAllocationController.getFrequencyInInstitution)
router.get("/differences/:id", SupportAllocationController.comparisonMinistryEducationData)
module.exports = router