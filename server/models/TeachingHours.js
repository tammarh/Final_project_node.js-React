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
        enum:['ל"ל','עיכוב התפתחותי - שפתי','הפרעות התנהגותיות רגשיות', 'מש"ה בינוני', 'ASD','הפרעות נפשיות', 'נכות פיזית'] // לא לשכוח לעשות middellwere
    },
    // (מספר ושם) מקור
    source:{
       // numSrc:{type:Number,enum:[5,6,25,16]}, -- אם עושים  2 enum צריך אח"כ ב middelware לעשות בדיקות התאמה
        nameSrc:{type:String,enum:['5 - סל עדיפות','6 - תקן בסיסי חנ"מ לקויות מורכבות',
        '25 - בסיסי חנ"מ רגיל לקויות קלות','16 - סל שח"מ']},
        required:true
    },
    // (מספר ושם) ייעוד
    designation:{
        //numDes:{type:Number,enum:[11,85,1,18,19,20,1,18,19,20,90,91,99]}, -- אם עושים 2 enum צריך אח"כ ב middelware לעשות בדיקות התאמה
        name:{type:String,enum:['11 - יוח"א','85 - ניהול','1 - תוכניות לימודים','18 - חינוך',
            '19 - ניהול','20 - יעוץ','1 - תוכניות לימודים','18 - חינוך','19 - ניהול',
            '20 - יעוץ','90 - רופא','91 - פרא רפואי','99 - אחות']},
        required:true
    }, // ❎❎ שיבדוק את ההתאמה בין המקור לייעוד  Middelware לא לשכוח לעשות   ❎❎
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

module.exports = mongoose.model('TeachingHours',TeachingHoursSchema)