const mongoose = require('mongoose')
//שעות הוראה

const TeachingHoursSchema = new mongoose.Schema({
    //סמל מוסד
    //תת סוג השעה(מספר ושם)
    //תאריך או טווח תאריכים
    // ביצוע??

},{timestamps:true})

module.exports = mongoose.model('TeachingHours',TeachingHoursSchema)