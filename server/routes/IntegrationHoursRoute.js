const express= require('express')
const router = express.Router()
const IntegrationHoursController = require('../controllers/IntegrationHoursController')
const verifyJWT = require('../middleware/verifyJWT')
const verifySupervisor = require('../middleware/verifySupervisor')

router.use(verifyJWT)
router.use(verifySupervisor)

router.get('/', IntegrationHoursController.getAllIHours)
router.get('/:id', IntegrationHoursController.getIHoursByInstitutionSymbol)
router.post('/', IntegrationHoursController.createIntegrationHours)
router.put('/', IntegrationHoursController.updateIntegrationHour)
router.delete('/:id',IntegrationHoursController.deleteIntegrationHour)

module.exports = router

