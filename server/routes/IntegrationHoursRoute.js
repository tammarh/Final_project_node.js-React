const express= require('express')
const router = express.Router()
const IntegrationHoursController = require('../controllers/IntegrationHoursController')

router.get('/', IntegrationHoursController.getAllIHours)
router.get('/:id', IntegrationHoursController.getIHoursByInstitutionSymbol)
router.post('/', IntegrationHoursController.createIntegrationHours)
router.put('/', IntegrationHoursController.updateIntegrationHour)
router.delete('/:id',IntegrationHoursController.deleteIntegrationHour)

module.exports = router

