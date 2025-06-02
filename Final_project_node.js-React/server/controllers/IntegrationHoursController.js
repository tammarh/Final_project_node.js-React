const IntegrationHours = require('../models/IntegrationHours')
const Institution = require('../models/Institution')

const getAllIHours = async (req,res)=>{
    const IHour = await IntegrationHours.find().populate({path: 'institution',select:'institutionName settlement localAuthority Supervisor '})
    if(!IHour)
        return res.status(400).json({message:'not found Integration Hours'})
    res.json(IHour)
}

const getIHoursByInstitutionSymbol = async (req,res)=>{
    const {id} = req.params
    const IHour = await IntegrationHours.find({institution:id}).populate({path:'institution',select:'institutionName settlement localAuthority Supervisor '}).lean()
    if(!IHour )
        return res.status(404).json( {massage :` לא נמצאו שעות שילוב למוסד עם מזהה: ${institutionId}` })
    res.json(IHour)
}

const createIntegrationHours = async (req,res)=>{
    const {institution,grade,equivalent,studentsAllocation,classType,source,calculatedQuota,designation,fromDate,untilDate,actualQuota} = req.body
    if(!institution)
        return res.status(400).json({message:'not found institution'})
    if( !designation || !fromDate || !untilDate  || !actualQuota)
        return res.status(400).json({message:'missing details'})
    const existingIntegrationHour = await IntegrationHours.findOne({ institution,designation }).populate({ path: 'institution', select: 'shiluv' });
    if (existingIntegrationHour) {
        return res.status(409).json({ message: 'שעות שילוב של מוסד עם ייעוד זה כבר קיימות' }); 
    }
    const Institutionn = await Institution.findById(institution)
    if (!Institutionn || !Institutionn.shiluv) {
        return res.status(400).json({ message: 'נתוני מוסד לא תקינים עבור חישוב מכסה שילוב' });
      }
    if(designation ==='21 - שעות הכנה')
        calculatedQuota =Institutionn.shiluv.achana   
    const newIhour = await IntegrationHours.create({institution,grade,equivalent,studentsAllocation,classType,source,designation,
        fromDate,untilDate,calculatedQuota,actualQuota})
    res.json(newIhour)
}

const updateIntegrationHour = async (req,res)=>{
    const {_id,source,designation,fromDate,untilDate,calculatedQuota,actualQuota} = req.body
    if(!_id)
        return res.status(400).json({massage:'missing id'})
    const IntegrationHour = await IntegrationHours.findOne({_id})
    if(!IntegrationHour)
        return res.status(400).json({massage:'not found IntegrationHour to update'})
    if(source)
        IntegrationHour.source = source
    if(designation)
        IntegrationHour.designation = designation
    if(fromDate)
        IntegrationHour.fromDate = fromDate
    if(untilDate)
        IntegrationHour.untilDate = untilDate
    if(calculatedQuota)
        IntegrationHour.calculatedQuota = calculatedQuota
    if(actualQuota)
        IntegrationHour.actualQuota = actualQuota

    const updateIntegrationhhour = await IntegrationHour.save()
    res.json(updateIntegrationhhour)

}

const deleteIntegrationHour = async (req,res)=>{
    const {id} = req.params
    if(!id)
        return res.status(400).json({massage:'not found IntegrationHour to delete'})
    const iHour = await IntegrationHours.findById(id)
    if(!iHour)
        return res.status(400).json({massage:'Invalid ID'})
    const i = await iHour.deleteOne()
    const reply=`IntegrationHour  ID ${id} deleted`
    res.json(reply)

}

module.exports = { getAllIHours,getIHoursByInstitutionSymbol,createIntegrationHours,updateIntegrationHour,deleteIntegrationHour }