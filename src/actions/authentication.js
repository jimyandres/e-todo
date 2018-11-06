import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
const loginAttempt = () => ({ type: 'AUTHENTICATION_LOGIN_ATTEMPT' });
const loginFailure = error => ({ type: 'AUTHENTICATION_LOGIN_FAILURE', error });
const loginSuccess = json => ({ type: 'AUTHENTICATION_LOGIN_SUCCESS', json });
const logoutFailure = error => ({ type: 'AUTHENTICATION_LOGOUT_FAILURE', error });
const logoutSuccess = () => ({ type: 'AUTHENTICATION_LOGOUT_SUCCESS' });
const registrationFailure = error => ({ type: 'AUTHENTICATION_REGISTRATION_FAILURE', error });
const registrationSuccess = () => ({ type: 'AUTHENTICATION_REGISTRATION_SUCCESS' });
const registrationSuccessViewed = () => ({ type: 'AUTHENTICATION_REGISTRATION_SUCCESS_VIEWED' });
const sessionCheckFailure = () => ({ type: 'AUTHENTICATION_SESSION_CHECK_FAILURE' });
const sessionCheckSuccess = json => ({ type: 'AUTHENTICATION_SESSION_CHECK_SUCCESS', json });

// Check User Session
const checkSession = () => async (dispatch) => {
  // contact the API
  await fetch(
    // where to contact
    '/api/authentication/checkSession',
    // what to send
    {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
    },
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    return null;
  }).then((json) => {
    if (json.username) {
      return dispatch(sessionCheckSuccess(json));
    }
    return dispatch(sessionCheckFailure());
  }).catch(err => dispatch(sessionCheckFailure(err)));
};

// Log User In
const logUserIn = userData => async (dispatch) => {
  // Clear the error box if it is displayed
  dispatch(clearError());

  // turn on spinner
  dispatch(incrementProgress());

  // register that a login attempt is being made
  dispatch(loginAttempt());

  // contact login API
  await fetch(
    // where to contact
    '/api/authentication/login',
    // what to send
    {
      method: 'POST',
      body: JSON.stringify(userData),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    },
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    return null;
  }).then((json) => {
    if (json) {
      dispatch(loginSuccess(json));
    } else {
      dispatch(loginFailure(new Error('Email or Password Incorrect. Please try again.')));
    }
  }).catch((error) => {
    dispatch(loginFailure(new Error(error)));
  });

  // turn off spinner
  return dispatch(decrementProgress());
};

// Log User Out
const logUserOut = () => async (dispatch) => {
  // Clear the error box if it is displayed
  dispatch(clearError());

  // turn on spinner
  dispatch(incrementProgress());

  // contact the API
  await fetch(
    // where to contact
    '/api/authentication/logout',
    // what to send
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  ).then((response) => {
    if (response.status === 200) {
      dispatch(logoutSuccess());
    } else {
      dispatch(logoutFailure(new Error(response.status)));
    }
  }).catch((err) => {
    dispatch(logoutFailure(new Error(err)));
  });

  // turn off spinner
  dispatch(decrementProgress());
};


// Register a User
const registerUser = userData => async (dispatch) => {
  // Clear the error box if it is displayed
  dispatch(clearError());

  // turn on spinner
  dispatch(incrementProgress());

  // contact the API
  await fetch(
    // where to contact
    '/api/authentication/register',
    // what to send
    {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    },
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    return null;
  }).then(async (json) => {
    if (json && json.username) {
      await dispatch(loginSuccess(json));
      await dispatch(registrationSuccess());
    } else {
      dispatch(registrationFailure(new Error(json.error.message ? 'Email or username already exists.' : json.error)));
    }
  }).catch((error) => {
    dispatch(registrationFailure(new Error(error.message || 'Registration Failed. Please try again.')));
  });

  // turn off spinner
  return dispatch(decrementProgress());
};

export {
  // Action Creators
  loginAttempt,
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  registrationFailure,
  registrationSuccess,
  registrationSuccessViewed,
  sessionCheckFailure,
  sessionCheckSuccess,
  // Others
  checkSession,
  logUserIn,
  logUserOut,
  registerUser,
};
