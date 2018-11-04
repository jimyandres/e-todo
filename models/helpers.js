const mongoose = require('mongoose');
const moment = require('moment');

// Return the corresponding msg format to display for required option enabled
const reqMsg = msg => ([true, msg]);

// Check if the string is a "valid" ObjectId (12 bytes)
const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id);

// Check if the date is greater than today's time
const isValidDate = date => moment(date) > moment();

export {
  reqMsg,
  isValidObjectId,
  isValidDate,
};
