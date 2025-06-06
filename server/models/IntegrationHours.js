const mongoose = require('mongoose')
//שעות שילוב
const IntegrationHourSchema = new mongoose.Schema({
    // סמל מוסד
    institution: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Institution'
    },
    // (מספר ושם) מקור
    source: {
      type: String, enum: ['49 - סל שילוב והכלה'],
      immutable: true,
      default: '49 - סל שילוב והכלה'
    },
    // (מספר ושם) ייעוד
    designation: {
            type: String, enum: ['19 - ניהול','21 - שעות הכנה','24 - מקדמות','27 - פרא רפואי']
        ,required: true
        
    }, 
    // תאריכים: ממתי 
    fromDate: {
        type: Date,
        required: true
    },
    // עד מתי
    untilDate: {
        type: Date,
        required: true
    },
    // תקן מחושב
    calculatedQuota: {
        type: Number,
        required: true
    },
    // תקן בפועל 
    actualQuota: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('IntegrationHours', IntegrationHourSchema)