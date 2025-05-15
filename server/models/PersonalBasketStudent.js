const mongoose = require('mongoose')
//תלמיד סל אישי
const PersonalBasketStudentSchema = new mongoose.Schema({
    //מוסד שאליו שייך
    institution:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Institution'
    },
    //מקונן שיכלול פרטים:
    //                  *ת.ז
    //                  *שם
    //                  *עיר מגורים
    //                  *קוד לקות 
    //                  *כיתה
    //                  *שעות זכאות
    details:{
        Id:{typ:String},
        name:{type:String},
        city:{type:String},
        disability:{type:String,
            enum:['לקויי למידה','הפרעות התנהגות','עיכוב התפתחותי', 'עיכוב התפתחותי שפתי',
                'הפרעות נפשיות','ASD תקדורת','לקויי ראיה','לקויי שמיעה' ,'נכויות פיזיות',
                'מחלות נדירות']},
        grade:{type:String,enum:['ח','ב','ג','ד','ה','ו','ז','א']},
        hour:{type:Number}// ספק אם צריך??? middelwere
    },
    // מערך שעות שלהם הוא זכאי ( סוג  &  כמות )
    entitlementHours:{
        type:[{
            type:String,enum:['קלינאית תקשורת',	'מרפאה בעיסוק',	'מטפלת באומנות','אחר'],
            hours:Number}]//אפשר להוסיף כאן enum
    }
},{timestamps:true})

module.exports = mongoose.model('PersonalBasketStudent',PersonalBasketStudentSchema)