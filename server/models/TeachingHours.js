const mongoose = require('mongoose')
//שעות הוראה

const TeachingHoursSchema = new mongoose.Schema({
    // סמל מוסד
    institution:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Institution'
    },
    // שכבה
    grade:{
        type:String,
        enum:['ח','ב','ג','ד','ה','ו','ז','א']
    },
    // מקבילה ????
    equivalent:{
        type:Number
    },
    // תלמידים הקצאה
    studentsAllocation:{
        type:Number,
        min:5,
        max:14
    },
    // סוג כיתה
    classType:{
        type:String,
        enum:['לל','עיכוב התפתחותי - שפתי','הפרעות התנהגותיות רגשיות', 'משה בינוני', 'ASD','הפרעות נפשיות', 'נכות פיזית'] // לא לשכוח לעשות middellwere
    },
    // (מספר ושם) מקור
    source:{
       type:String,enum:['5 - סל עדיפות','6 - תקן בסיסי חנמ לקויות מורכבות',
        '25 - בסיסי חנמ רגיל לקויות קלות','16 - סל שחמ'],
        required:true
    },
    // (מספר ושם) ייעוד
    designation:{
        type:String,enum:['11 - יוחא','85 - ניהול','1 - תוכניות לימודים','18 - חינוך',
            '19 - ניהול','20 - יעוץ','1 - תוכניות לימודים','18 - חינוך','19 - ניהול',
            '20 - יעוץ','90 - רופא','91 - פרא רפואי','99 - אחות'],
        required:true
    }, 
    // תאריכים: ממתי 
    fromDate:{
        type:Date,
        required:true
    },
    // עד מתי
    untilDate:{
        type:Date,
        required:true
    },
    // תקן מחושב
    calculatedQuota:{
        type:Number,
        required:true
    },
    // תקן בפועל 
    actualQuota:{
        type:Number,
        required:true
    }
},{timestamps:true})


const sourceDesignationMap = {
    '5 - סל עדיפות': ['11 - יוחא', '85 - ניהול'],
    '6 - תקן בסיסי חנמ לקויות מורכבות': ['1 - תוכניות לימודים', '18 - חינוך', '19 - ניהול', '20 - יעוץ'],
    '25 - בסיסי חנמ רגיל לקויות קלות': ['1 - תוכניות לימודים', '18 - חינוך', '19 - ניהול', '20 - יעוץ'],
    '16 - סל שחמ': ['90 - רופא', '91 - פרא רפואי', '99 - אחות']
}

TeachingHoursSchema.pre('save', function(next) {
    const { source, designation } = this;
    const validDesignations = sourceDesignationMap[source]

    if (!validDesignations || !validDesignations.includes(designation)) {
        const error = new Error(`Invalid designation "${designation}" for source "${source}"`)
        err.statusCode = 422;
        return next(error)    
    }
    next()
})

TeachingHoursSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate()
    const source = update.source;
    const designation = update.designation

    if (source && designation) {
        const validDesignations = sourceDesignationMap[source];
        if (!validDesignations || !validDesignations.includes(designation)) {
            const error = new Error(`Invalid designation "${designation}" for source "${source}"`);
            err.statusCode = 422;
            return next(error);
        }
    }
    next()
})
module.exports = mongoose.model('TeachingHours',TeachingHoursSchema)