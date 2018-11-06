import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
const userAddFailure = error => ({ type: 'ADD_USER_FAILURE', error });
const userAddSuccess = () => ({ type: 'ADD_USER_SUCCESS' });

// Create a new users
const addUser = params => async (dispatch) => {
  // clear the error box if it's displayed
  dispatch(clearError());

  dispatch(incrementProgress());

  // Send params to our API
  await fetch(
    '/api/users',
    // what to send
    {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json.user) {
        return dispatch(userAddSuccess());
      }
      return dispatch(userAddFailure(new Error(json.error)));
    })
    .catch(error => dispatch(userAddFailure(new Error(error))));

  // turn off spinner
  return dispatch(decrementProgress());
};

export {
  // Action Creators
  userAddFailure,
  userAddSuccess,
  // Helpers
  addUser,
};
