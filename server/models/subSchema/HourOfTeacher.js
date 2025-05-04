const mongoose = require('mongoose')

const HourOfTeacherSchema = new mongoose.Schema({
    institutionSymbol:{
        type:String,
        required:true
    },
    integrationhours:{
        type:Number
    },
    personalbasket:{
        type:Number
    },
    additionforpersonalbasket:{
        type:Number
    },
    education:{
        type:Boolean,
        default:false
    },
    firstgradeeducation:{
        type:Boolean,
        default:false
    }
},{})

module.exports = mongoose.model('HourOfTeacher',HourOfTeacherSchema)