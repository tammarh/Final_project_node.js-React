const mongoose = require('mongoose')
//מודל מוסד
const InstitutionSchema = new mongoose.Schema({
    //סמל מוסד
    institutionSymbol:{
        type : String,
        required : true,
        unique: true,
        index: true
    },
    //שם
    institutionName:{
        type:String,
        required : true
    },
    //יישוב
    settlement:{
        type:String,
        required : true
    },
    //רשת מקומית
    localAuthority:{
        type:String,
        required : true
    },
    //מפקחת
    Supervisor:{
        type:String ,
        required : true
    }
}
,{timestamps:true}) 

module.exports = mongoose.model('Institution',InstitutionSchema)