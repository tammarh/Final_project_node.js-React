const express= require('express')
const router = express.Router()
const TeachingHoursController = require('../controllers/TeachingHoursController')
const verifyJWT = require('../middleware/verifyJWT')
const verifySupervisor = require('../middleware/verifySupervisor')

router.use(verifyJWT)
router.use(verifySupervisor)

router.get('/', TeachingHoursController.getAllTHours)
router.get('/:id', TeachingHoursController.getTHoursByInstitutionSymbol)
router.post('/', TeachingHoursController.createTeachingHour)
router.put('/', TeachingHoursController.updateTeachingHour)
router.delete('/:id',TeachingHoursController.deleteTeachHour)

module.exports = router