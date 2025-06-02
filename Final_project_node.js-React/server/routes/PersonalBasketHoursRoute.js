const express= require('express')
const router = express.Router()
const PersonalBasketHoursController = require('../controllers/PersonalBasketHoursController')
const verifyJWT = require('../middleware/verifyJWT')
const verifySupervisor = require('../middleware/verifySupervisor')

router.use(verifyJWT)
router.use(verifySupervisor)

router.get('/', PersonalBasketHoursController.getAllPHours)
router.get('/:id', PersonalBasketHoursController.getPHoursByInstitutionSymbol)
router.post('/', PersonalBasketHoursController.createPersonalBasketHour)
router.put('/', PersonalBasketHoursController.updatePersonalBasketHour)
router.delete('/:id',PersonalBasketHoursController.deletePersonalBasketHour)

module.exports = router