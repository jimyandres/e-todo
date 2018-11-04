const createDOMPurify = require('dompurify');
const express = require('express');
const { JSDOM } = require('jsdom');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/user');

const router = express.Router();

// configure mongoose promise
mongoose.Promise = global.Promise;

// GET to /checksession
router.get('/checksession', (req, res) => {
  if (req.user) {
    return res.send(JSON.stringify(req.user));
  }
  return res.send(JSON.stringify({}));
});

// GET to /logout
router.get('/logout', (req, res) => {
  req.logout();
  return res.send(JSON.stringify(req.user));
});

// POST to /login
router.post('/login', async (req, res) => {
  // look up the user by their email
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();

  // if they exists, they'll have a username, so add that to the body
  if (foundUser) {
    req.body.username = foundUser.username;
  }
  passport.authenticate('local')(req, res, () => {
    // If logged in, we should should have user info to send back
    if (req.user) {
      return res.send(JSON.stringify(req.user));
    }

    // Otherwise return an error
    return res.send(JSON.stringify({ error: 'There was an error logging in' }));
  });
});

// POST to /register
router.post('/register', async (req, res) => {
  // First, check and make sure the email doesn't aready exist
  const query = User.findOne({ $or: [{ email: req.body.email }, { id: req.body.id }] });
  const foundUser = await query.exec();

  if (foundUser) {
    return res.send(JSON.stringify({ error: 'Email or id already exists.' }));
  }
  if (!foundUser) {
    // sanitize data
    const { window } = (new JSDOM(''));
    const DOMPurify = createDOMPurify(window);
    const sanitizedBody = {
      birthday: DOMPurify.sanitize(req.body.birthday),
      email: DOMPurify.sanitize(req.body.email),
      firstName: DOMPurify.sanitize(req.body.firstName),
      id: DOMPurify.sanitize(req.body.id),
      lastName: DOMPurify.sanitize(req.body.lastName),
      password: req.body.password,
      username: DOMPurify.sanitize(req.body.username),
    };

    // Create a user object to save, using values from incoming JSON
    const newUser = new User(sanitizedBody);

    // Save, via Passport's "register" method, the user
    return User.register(newUser, req.body.password, (err) => {
      // If there's a problem, send back a JSON object with the error
      if (err) {
        return res.send(JSON.stringify({ error: err.message }));
      }
      // Otherwise log them in
      return passport.authenticate('local')(req, res, () => {
        // If logged in, we should have user info to send back
        if (req.user) {
          return res.send(JSON.stringify(req.user));
        }
        // Otherwise return an error
        return res.send(JSON.stringify({ error: 'There was an error registering the user.' }));
      });
    });
  }

  // return an error if all else fails
  return res.send(JSON.stringify({ error: 'There was an error registering the user.' }));
});

// POST to savepassword
router.post('/savepassword', async (req, res) => {
  let result;
  try {
    // look up user in the DB base on reset hash
    const query = User.findOne({ passwordReset: req.body.hash });
    const foundUser = await query.exec();

    // If the user exists save their new password
    if (foundUser) {
      // user passport's built-in password set method
      foundUser.setPassword(req.body.password, (err) => {
        if (err) {
          result = res.send(JSON.stringify({ error: 'Password could not be saved. Please try again.' }));
        } else {
          // once the password's set, save the user object
          foundUser.save((error) => {
            if (error) {
              result = res.send(JSON.stringify({ error: 'Password could not be saved. Please try again.' }));
            }
            // Send a success message
            result = res.send(JSON.stringify({ success: true }));
          });
        }
      });
    } else {
      // If the hash didn't bring up a user, error out
      result = res.send(JSON.stringify({ error: 'Reset hash not found in the database' }));
    }
  } catch (e) {
    result = res.send(JSON.stringify({ error: 'There was an error connecting to the database' }));
  }
  return result;
});

module.exports = router;
