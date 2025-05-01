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
    //                  *לקות
    details:{
        Id:{typ:String},
        name:{type:String},
        city:{type:String},
        disability:{type:String}
    },
    //מערך שעות שלהם הוא זכאי( סוג  &  כמות )
    entitlementHours:{
        type:[{type:String,hours:Number}]
    }
    //??מערך שעות בפועל (המערך יכיל איברים מסוג  PersonalBasketHours )???
},{timestamps:true})

module.exports = mongoose.model('PersonalBasketStudent',PersonalBasketStudentSchema)