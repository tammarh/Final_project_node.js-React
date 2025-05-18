const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   passward: {
      type: String,
      required: true

   },
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   rolse: {
      type: String,
      enum: ['Supervisor', 'teacher', 'מזכירה'],
      default: 'teacher'
   },
   active:{
      type: Boolean,
      default: true
   }

}, { timestamps: true })


module.exports = mongoose.model('User', UserSchema)