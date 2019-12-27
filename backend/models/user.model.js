const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  gender:{
    type: String,
    required: true
  },
  dob :  { type: Date, required: true },
  news :  {type: Boolean},
  email : {type:String},
  photo : {type: String}

}, {
  timestamps: true,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
