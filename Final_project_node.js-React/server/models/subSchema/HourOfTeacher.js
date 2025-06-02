const mongoose = require('mongoose')
const Institution = require('../Institution')

const HourOfTeacherSchema = new mongoose.Schema({
    Institution:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Institution',
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

module.exports = HourOfTeacherSchema