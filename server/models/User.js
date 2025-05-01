const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
 username:{
    type:String,
    required:true,
    unique:true
 },
 passward:{
    type:String,
    required:true
    
 },
 name:{
    type:String
 },
rolse:{
    type:String,
    enum:['pikuah','manha','mora','other'],
    default:'other'
}

},{timestamps:true})


module.exports = mongoose.model('User',userSchema)