const mongoose = require('mongoose')
const HourOfTeacher = require('./subSchema/HourOfTeacher')

const TeacherSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    allPlaceWork:{
        type:[HourOfTeacher]
    }
},{timestamps:true})

module.exports = mongoose.model('Teacher',TeacherSchema)