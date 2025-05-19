const express = require("express")
const router = express.Router()
const SupportAllocationController = require("../controllers/SupportAllocationController")
const verifyJWT = require("../middleware/verifyJWT")
const verifySupervisor = require("../middleware/verifySupervisor")

router.use(verifyJWT)
router.use(verifySupervisor)

router.get("/:id", SupportAllocationController.getFrequencyInInstitution)
router.get("/differences/:id", SupportAllocationController.comparisonMinistryEducationData)
module.exports = router