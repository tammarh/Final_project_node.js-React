const mongoose = require('mongoose')
//מודל מוסד
const InstitutionSchema = new mongoose.Schema({
    //סמל מוסד
    //שם
    //יישוב
    //מפקחת
    //מנחה??
    //כתובת??
}
,{timestamps:true}) 

module.exports = mongoose.model('Institution',InstitutionSchema)