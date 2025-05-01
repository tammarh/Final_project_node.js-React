const mongoose = require('mongoose')
//פילוחי תמיכות

const SupportAllocationSchema = new mongoose.Schema({
    //שם התלמיד 
    name:{
        type:String
    }, 
    //ת.ז
    ID:{
        type:String,
        required:true
    },
    //הלקות
    disability:{
        type:String, //אולי להוסיף enum
        required:true
    },
    //והתמיכות להן זכאי????
},{timestamps:true})

module.exports = mongoose.model('SupportAllocation',SupportAllocationSchema)