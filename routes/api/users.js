const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

const { ObjectId } = mongoose.Types;

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

// Get tasks by visibility
const byVisibility = (userId, visibility) => {
  switch (visibility) {
    case 'all':
      return User.findOne({
        _id: ObjectId(userId),
      }).populate({
        path: 'tasks',
      }).select('tasks');
    case 'pending':
      return User.findOne({
        _id: ObjectId(userId),
      }).populate({
        path: 'tasks',
        match: { completed: false },
      }).select('tasks');
    case 'completed':
      return User.findOne({
        _id: ObjectId(userId),
      }).populate({
        path: 'tasks',
        match: { completed: true },
      }).select('tasks');
    default:
      throw new Error(`unknown filter: ${visibility}`);
  }
};

// Get user tasks by his id
const getUserTasks = async (userId, visibility, res) => {
  const userQuery = await byVisibility(userId, visibility);
  if (!userQuery) {
    return res.json({ error: 'There was an error getting the tasks from the database. Please try again.' });
  }
  return res.json(userQuery);
};

// Check the restrictions to make the task
const saveTask = async (userId, taskInfo, res) => {
  // Get the user's info
  await User.findOne({
    _id: ObjectId(userId),
  })
    .populate('tasks')
    .exec(async (err, userInfo) => {
      if (userInfo !== null) {
        // Add the user id to the task
        Object.assign(taskInfo, { user: userInfo._id });
        const newTask = new Task(taskInfo);
        await newTask.save((error, task) => {
          if (error) {
            return res.json({ error: 'There was an error saving the task to the database. Please try again.', e: error });
          }
          return res.json({ task });
        });
      } else {
        return res.json({ error: "The user doesn't exists. Please verify the information.", no_user: true });
      }
      return null;
    });
};

// Check a task
const checkTask = async (userId, taskId, prevState, res) => {
  // Get the task to check
  await Task.updateOne({
    _id: ObjectId(taskId),
  }, { $set: { completed: !prevState } })
    .then(() => Task.findOne({ _id: taskId })
      .exec(async (err, task) => {
        if (err) {
          return res.json({ error: 'There was an error checking the task. Please try again.', e: err });
        }
        return res.json({ task });
      }));
};

// Edit a task
const editTask = async (userId, taskId, newText, res) => {
  // Get the task to edit
  await Task.updateOne({
    _id: ObjectId(taskId),
  }, { $set: { name: newText } })
    .then(() => Task.findOne({ _id: taskId })
      .exec(async (err, task) => {
        if (err) {
          return res.json({ error: 'There was an error updating the task. Please try again.', e: err });
        }
        return res.json({ task });
      }));
};

// Delete a task
const deleteTask = async (userId, taskId, visibility, res) => {
  // Get the user's info
  await User.findOne({
    _id: ObjectId(userId),
  })
    .populate('tasks')
    .exec(async (err, userInfo) => {
      if (userInfo !== null) {
        await Task.deleteOne({ _id: taskId })
          .exec((error) => {
            if (error) {
              return res.json({ error: 'There was an error deleting the task from the database. Please try again.', e: error });
            }
            return getUserTasks(userId, visibility, res);
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
router.get('/:user_id/tasks/:visibility', async (req, res) => {
  const userId = req.params.user_id;
  const { visibility } = req.params;
  let result;

  try {
    // Get the tasks
    return await getUserTasks(userId, visibility, res);
  } catch (e) {
    result = res.json({ error: 'There was an error getting the tasks. Please try again.' });
  }

  return result;
});

// POST to /:user_id/checkTask/:task_id
router.post('/:user_id/checkTask/:task_id', async (req, res) => {
  const { prevState } = req.body;
  const userId = req.params.user_id;
  const taskId = req.params.task_id;
  let result;

  try {
    // Save the task to the DB
    return await checkTask(userId, taskId, prevState, res);
  } catch (e) {
    result = res.json({ error: 'There was an error checking the task. Please try again.', e });
  }

  return result;
});

// POST to /:user_id/tasks/:task_id
router.post('/:user_id/tasks/:task_id', async (req, res) => {
  const { text } = req.body;
  const userId = req.params.user_id;
  const taskId = req.params.task_id;
  let result;

  try {
    // Save the task to the DB
    return await editTask(userId, taskId, text, res);
  } catch (e) {
    result = res.json({ error: 'There was an error updating the task. Please try again.', e });
  }

  return result;
});

// DELETE to /:user_id/tasks/:task_id
router.delete('/:user_id/tasks/:task_id', async (req, res) => {
  const { visibility } = req.body;
  const userId = req.params.user_id;
  const taskId = req.params.task_id;
  let result;

  try {
    // Save the task to the DB
    return await deleteTask(userId, taskId, visibility, res);
  } catch (e) {
    result = res.json({ error: 'There was an error updating the task. Please try again.', e });
  }

  return result;
});

module.exports = router;
