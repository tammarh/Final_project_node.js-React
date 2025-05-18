const express= require('express')
const router = express.Router()
const InstitutionController = require('../controllers/InstitutionController')

router.get('/', InstitutionController.getAllInstitution)
router.post('/', InstitutionController.createInstitution)
router.put('/', InstitutionController.updateInstitution)
router.delete('/:id',InstitutionController.deleteInstitution)

module.exports = router
