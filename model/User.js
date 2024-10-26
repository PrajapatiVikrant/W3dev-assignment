const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  data:{
    type:Array,
    required:true
  },
  data:[
    {
      checkstatus:{
        type:Boolean,
        default:false
      },
      text:{
        type: String,
        required:true
      }
    }
   
  ]
});

const User = mongoose.model('todolist', userSchema);

module.exports = User;
