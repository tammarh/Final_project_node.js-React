const mongoose = require('mongoose')
//שעות סל אישי
const PersonalBasketHoursSchema = new mongoose.Schema({
    //יש צורך??? -ת.ז תלמיד
    
    // סמל מוסד
    institution:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Institution'
    },
    // (מספר ושם) מקור
    source:{
       // numSrc:{type:Number,enum:[24,55]}, -- אם עושים  2 enum צריך אח"כ ב middelware לעשות בדיקות התאמה
        nameSrc:{type:String,enum:['24 - סל שילוב - מתיא','55 - הנחיית צוות המוס"ח'], required:true
        },
    },
    // (מספר ושם) ייעוד
    designation:{
        //numDes:{type:Number,enum:[1,27,28,30,1,21]}, -- אם עושים 2 enum צריך אח"כ ב middelware לעשות בדיקות התאמה
        name:{type:String,enum:[ '1 - תוכניות לימודים' ,  '27 - פרא רפואי' , '28 - לק"ש' ,  '30 - לק"ר' , '1 - תוכניות לימודים' , '21 - שעות הכנה'],        required:true
        },
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

module.exports = mongoose.model('PersonalBasketHours',PersonalBasketHoursSchema)