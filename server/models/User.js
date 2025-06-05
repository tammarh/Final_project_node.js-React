const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   password: {
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
   active: {
      type: Boolean,
      default: true
   },
   isTeacher: {
      type: Boolean,
      default: true
   },
   HourOfTeacher: {
      type:  [{
         institutionId: { type: String, default: '' },
         integrationhours: { type: Number, default: null },
         personalbasket: { type: Number, default: null },
         additionforpersonalbasket: { type: Number, default: null },
         education: { type: Boolean, default: false },
         firstgradeeducation: { type: Boolean, default: false }
      }],
      default: []
   }

}, { timestamps: true })


module.exports = mongoose.model('User', UserSchema)