const mongoose = require('mongoose')
//מודל מוסד
const InstitutionSchema = new mongoose.Schema({
    //סמל מוסד
    institutionSymbol:{
        type : String,
        required : true,
        unique: true,
        index: true
    },
    //שם
    institutionName:{
        type:String,
        required : true
    },
    //יישוב
    settlement:{
        type:String,
        required : true
    },
    //רשת מקומית
    localAuthority:{
        type:String,
        enum:['ירושלים','קרית יערים','ביתר עילית','מטה בנימין','מודיעין עילית','בית שמש','טבריה','צפת','חדרה','חיפה','קרית אתא',
            'גבעת זאב','ראשון לציון','פתח תקוה','אור יהודה','בני ברק','תל אביב - יפו','אשדוד','אשקלון','באר שבע','נתיבות',
            'מרחבים','ערד','אופקים','עפולה','קרית גת'],//???? מיותר אם עתידים להתווסף רשויות מקומיות????
        required : true
    },
    //מפקחת
    Supervisor:{
        type:String ,//objectID אולי עדיף
        required : true
    }
    //מנחה??
}
,{timestamps:true}) 

module.exports = mongoose.model('Institution',InstitutionSchema)