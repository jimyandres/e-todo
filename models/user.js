const mongoose = require('mongoose');

const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const { reqMsg } = require('./helpers');

const User = new Schema({
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
  id: {
    type: Number,
    unique: true,
    required: reqMsg('No identification given'),
  },
  firstName: {
    type: String,
    required: reqMsg('No First Name given'),
  },
  lastName: {
    type: String,
    required: reqMsg('No Last Name given'),
  },
  email: {
    type: String,
    required: reqMsg('No e-email given'),
    unique: true,
  },
  passwordReset: {
    type: String,
    select: false,
  },
  username: {
    type: String,
    required: reqMsg('No userName given'),
    unique: true,
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
