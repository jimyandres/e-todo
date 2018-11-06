const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('./user');

const { reqMsg, isValidObjectId, isValidDate } = require('./helpers');

const Task = new Schema({
  name: {
    type: String,
    required: reqMsg('No Name given'),
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: reqMsg('No priority type given'),
  },
  completed: {
    type: Boolean,
    required: reqMsg('No state given'),
  },
  dueDate: {
    type: Date,
    required: reqMsg('No due-date given'),
    validate: {
      validator: isValidDate,
      message: 'Due-Date has not a valid date',
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: reqMsg('No User given'),
    validate: {
      validator: isValidObjectId,
      message: 'The user has not a valid id',
    },
  },
}, { timestamps: { createdAt: 'createdAt' } });

Task.pre('save', function (next) {
  User.findById(this.user, (err, userInfo) => {
    if (err) {
      next(err);
    }
    userInfo.tasks.push(this._id);
    userInfo.save((e) => {
      if (e) {
        next(e);
      }
      next();
    });
  });
});

Task.pre('remove', function (next) {
  User.findById(this.user, (err, userInfo) => {
    if (err) {
      next(err);
    }
    userInfo.tasks.pull(this._id);
    userInfo.save((e) => {
      if (e) {
        next(e);
      }
      next();
    });
  });
});

module.exports = mongoose.model('Task', Task);
