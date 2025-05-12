const Institution = require('../models/Institution')

const getAllInstitution = async (req,res)=>{
      const institutions = await Institution.find().lean()
        if(!institutions)
            return res.status(204).json({message:'[]'})
        res.json(institutions)
}

const createInstitution = async (req,res) =>{
    const { institutionSymbol,institutionName,settlement,localAuthority,Supervisor,numStudent,longEducationDay } = req.body
    if(!institutionSymbol || !institutionName || !settlement || !localAuthority || !Supervisor || !numStudent )
        return res.status(400).json({massege:'missing ditails'})
    const shiluv = {Niul:numStudent*0.077*1.55,achana:numStudent*0.077*0.3}
    const newInstitution = await Institution.create({ institutionSymbol,institutionName,settlement,localAuthority,Supervisor,
        numStudent,longEducationDay,shiluv })
    if(!newInstitution)
        return res.status(400).json({ message: 'Invalid institution'})
    res.json(newInstitution)

}

const updateInstitution = async (req,res) => {
    const { institutionSymbol,institutionName,settlement,localAuthority,Supervisor,numStudent,longEducationDay } = req.body
    if(!institutionSymbol)
        return res.status(404).json({massege:'not found this institution'})
    const institution = await Institution.findOne({institutionSymbol}).exec()
    if(!institution)
        return res.status(404).json({massege:'not found institution to update'})
    if(institutionName)
        institution.institutionName = institutionName
    if(settlement)
        institution.settlement = settlement
    if(localAuthority)
        institution.localAuthority = localAuthority
    if(Supervisor)
        institution.Supervisor = Supervisor
    if(numStudent)
        institution.numStudent = numStudent
    if(longEducationDay)
        institution.longEducationDay = longEducationDay
    const updatedInstitution = await institution.save()
    res.json(updatedInstitution)
}

const deleteInstitution = async (req,res) =>{
    const { id } = req.params
    if(!id)
        return res.status(400).json({ message: 'id not found' })
    const institution = await Institution.findById(id).exec()
    if (!institution) {
    return res.status(404).json({ message: 'Institution not found' })
    }
    const result = await institution.deleteOne()
    const reply=`institution  ID ${id} deleted`
    res.json(reply)
}
module.exports = { getAllInstitution , createInstitution , updateInstitution , deleteInstitution }

//בדקתי את הקובץ הזה ב postman וסידרתי אותו אבל לא עשיתי בדיקות קצה