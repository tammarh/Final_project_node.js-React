const express= require('express')
const router = express.Router()
const TeachingHoursController = require('../controllers/TeachingHoursController')

router.get('/', TeachingHoursController.getAllTHours)
router.get('/:id', TeachingHoursController.getTHoursByInstitutionSymbol)
router.post('/', TeachingHoursController.createTeachingHour)
router.put('/', TeachingHoursController.updateTeachingHour)
router.delete('/:id',TeachingHoursController.deleteTeachHour)

module.exports = router