const mongoose = require('mongoose')
//שעות שילוב
const IntegrationHourSchema = new mongoose.Schema({
    //סמל מוסד
    //תת סוג השעה(מספר ושם)
    //תאריך או טווח תאריכים
    // ביצוע??
},{timestamps:true})