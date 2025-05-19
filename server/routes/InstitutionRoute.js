const express= require('express')
const router = express.Router()
const InstitutionController = require('../controllers/InstitutionController')
const verifyJWT = require('../middleware/verifyJWT')
const verifySupervisor = require('../middleware/verifySupervisor')

router.use(verifyJWT)

router.get('/', InstitutionController.getAllInstitution)
router.post('/', verifySupervisor , InstitutionController.createInstitution)
router.put('/', verifySupervisor, InstitutionController.updateInstitution)
router.delete('/:id', verifySupervisor , InstitutionController.deleteInstitution)

module.exports = router
