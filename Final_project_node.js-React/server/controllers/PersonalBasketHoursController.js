const PersonalBasketHours = require('../models/PersonalBasketHours')

const getAllPHours = async (req,res)=>{
    const pHour = await PersonalBasketHours.find().populate({path: 'institution',select:'institutionName settlement localAuthority Supervisor '})
    if(!pHour)
        return res.status(204).json({message:[]})
    res.json(pHour)
}


const getPHoursByInstitutionSymbol = async (req,res)=>{
    const {id} = req.params
    const pHour = await PersonalBasketHours.find({institution:id})
    if(!pHour )
        return res.status(404).json( {massage :` לא נמצאו שעות סל אישי למוסד עם מזהה: ${institutionId}` })
    res.json(pHour)
}

const createPersonalBasketHour = async (req,res)=>{
    const {institution,source,designation,fromDate,untilDate,calculatedQuota,actualQuota} = req.body
    if(!institution)
        return res.status(400).json({message:'not found institution'})
    if(!source || !designation || !fromDate || !untilDate || !calculatedQuota || !actualQuota)
        return res.status(400).json({message:'missing details'})
    const existingPersonalBasketHour = await PersonalBasketHours.findOne({ institution,designation });
    if (existingPersonalBasketHour) {
        return res.status(409).json({ message: 'שעות סל אישי עם מוסד, שכבה וייעוד זה כבר קיימות' }); 
    }
    const newPhour = await PersonalBasketHours.create({institution,source,designation,fromDate,untilDate,calculatedQuota,actualQuota})
    res.json(newPhour)
}

const updatePersonalBasketHour = async (req,res)=>{
    const {_id,source,designation,fromDate,untilDate,calculatedQuota,actualQuota} = req.body
    if(!_id)
        return res.status(400).json({massage:'missing id'})
    const personalBasketHour = await PersonalBasketHours.findOne({_id})
    if(!personalBasketHour)
        return res.status(400).json({massage:'not found PersonalBasketHour to update'})
    if(source)
        personalBasketHour.source = source
    if(designation)
        personalBasketHour.designation = designation
    if(fromDate)
        personalBasketHour.fromDate = fromDate
    if(untilDate)
        personalBasketHour.untilDate = untilDate
    if(calculatedQuota)
        personalBasketHour.calculatedQuota = calculatedQuota
    if(actualQuota)
        personalBasketHour.actualQuota = actualQuota
    const updatedPersonalBasketHour = await personalBasketHour.save()
        res.json(updatedPersonalBasketHour)
    }

const deletePersonalBasketHour = async (req,res)=>{
    const {id} = req.params
    if(!id)
        return res.status(400).json({massage:'missing id'})
    const personalBasketHour = await PersonalBasketHours.findOne({_id:id})
    if(!personalBasketHour)
        return res.status(400).json({massage:'not found PersonalBasketHour to delete'})
    const deletedPersonalBasketHour = await personalBasketHour.deleteOne()
    res.json(deletedPersonalBasketHour)
}

module.exports = {
    getAllPHours,
    getPHoursByInstitutionSymbol,
    createPersonalBasketHour,
    updatePersonalBasketHour,
    deletePersonalBasketHour
}