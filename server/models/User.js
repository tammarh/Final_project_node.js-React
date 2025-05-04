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
    enum:['מפקחת','מורה','מזכירה']
}

},{timestamps:true})


module.exports = mongoose.model('User',UserSchema)