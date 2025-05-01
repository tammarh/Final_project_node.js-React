const mongoose = require('mongoose')
//שעות סל אישי
const PersonalBasketHoursSchema = new mongoose.Schema({
    //סמל מוסד
    //תת סוג השעה(מספר ושם)
    //תאריך או טווח תאריכים
    // ביצוע??
},{timestamps:true})

module.exports = mongoose.model('PersonalBasketHours',PersonalBasketHoursSchema)