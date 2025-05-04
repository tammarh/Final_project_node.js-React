// const mongoose = require('mongoose')
// //פילוחי תמיכות

// const SupportAllocationSchema = new mongoose.Schema({
//     //שם התלמיד 
//     name:{
//         type:String
//     }, 
//     //ת.ז
//     ID:{
//         type:String,
//         required:true
//     },
//     //כיתה
//     grade:{
//         type:String,
//         enum:['ח','ב','ג','ד','ה','ו','ז','א']
//     },
//     // קוד הלקות 
//     disability:{
//         type:String, //אולי להוסיף enum
//         required:true
//     },
//     //מספר השעות להן זכאי
//     numHour:{
//         type:Number
//     }
//     /// not finish !!!!
// },{timestamps:true})

// module.exports = mongoose.model('SupportAllocation',SupportAllocationSchema)