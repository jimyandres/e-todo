const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

// Models
const User = require('../../models/user');
const Task = require('../../models/task');

const router = express.Router();

// config mongoose promise
mongoose.Promise = global.Promise;

// Get user info by his id
const getUserInfo = async (userId, res) => {
  const userQuery = await User.findOne({
    id: userId,
  });
  if (!userQuery) {
    return res.json({ error: 'The user requested does not exists. Please check the information.' });
  }
  return res.json(userQuery);
};

// Get user tasks by his id
const getUserTasks = async (userId, res) => {
  const userQuery = await User.findOne({
    id: userId,
  })
    .populate({
      path: 'tasks',
    })
    .select('tasks');

  if (!userQuery) {
    return res.json({ error: 'There was an error getting the tasks from the database. Please try again.' });
  }
  return res.json(userQuery);
};

// Check the restrictions to make the task
const saveTask = async (userId, taskInfo, res) => {
  // Get the user's info
  await User.findOne({
    id: userId,
  })
    .populate('tasks')
    .exec(async (err, userInfo) => {
      if (userInfo !== null) {
        // Add the user id to the task
        Object.assign(taskInfo, { user: userInfo._id });
        const newTask = new Task(taskInfo);
        await newTask.save((error, task) => {
          if (error) {
            return res.json({ error: 'There was an error saving the task to the database. Please try again.' });
          }
          return res.json({ task });
        });
      } else {
        return res.json({ error: "The user doesn't exists. Please verify the information.", no_user: true });
      }
      return null;
    });
};

// Check if the user exists and if it does not, save it
const saveUser = async (userInfo, res) => {
  const userQuery = await User.findOne({
    id: userInfo.id,
  });
  if (!userQuery) {
    const newUser = new User(userInfo);
    await newUser.save((error, user) => {
      if (error) {
        return res.json({ error: 'There was an error saving the User to the database. Please try again.' });
      }
      return res.json({ user });
    });
  } else {
    return res.json({ error: 'The user is already in the database. Please check the information.' });
  }
  return null;
};

// Post to /
router.post('/', async (req, res) => {
  const userInfo = req.body;
  let result;

  try {
    // Save it to the DB
    return await saveUser(userInfo, res);
  } catch (e) {
    result = res.json({ error: 'There was an error saving the user info. Please try again.' });
  }

  return result;
});

// GET to /:id
router.get('/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  let result;

  try {
    // Get user info
    return await getUserInfo(userId, res);
  } catch (e) {
    result = res.json({ error: "There was an error getting the user's info. Please try again." });
  }

  return result;
});

// POST to /:user_id/tasks
router.post('/:user_id/tasks', async (req, res) => {
  const taskInfo = req.body;
  const userId = req.params.user_id;
  let result;

  try {
    // Save the task to the DB
    return await saveTask(userId, taskInfo, res);
  } catch (e) {
    result = res.json({ error: 'There was an error making the task. Please try again.' });
  }

  return result;
});

// GET to/:user_id/tasks
router.get('/:user_id/tasks', async (req, res) => {
  const userId = req.params.user_id;
  let result;

  try {
    // Get the tasks
    return await getUserTasks(userId, res);
  } catch (e) {
    result = res.json({ error: 'There was an error getting the tasks. Please try again.' });
  }

  return result;
});

module.exports = router;
