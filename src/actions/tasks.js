import 'whatwg-fetch';
import { decrementProgress, incrementProgress } from './progress';
import { clearError } from './error';

// Action Creators
const taskCheckSuccess = json => ({ type: 'TASK_CHECK_SUCCESS', json });
const taskCheckFailureNoUser = json => ({ type: 'TASK_CHECK_FAILURE_NO_USER', json });
const taskCheckFailure = error => ({ type: 'TASK_CHECK_FAILURE', error });
const taskDeleteSuccess = (json, visibility) => ({ type: 'TASK_DELETE_SUCCESS', json, visibility });
const taskDeleteFailureNoUser = json => ({ type: 'TASK_DELETE_FAILURE_NO_USER', json });
const taskDeleteFailure = error => ({ type: 'TASK_DELETE_FAILURE', error });
const taskEditSuccess = json => ({ type: 'TASK_EDIT_SUCCESS', json });
const taskEditFailureNoUser = json => ({ type: 'TASK_EDIT_FAILURE_NO_USER', json });
const taskEditFailure = error => ({ type: 'TASK_EDIT_FAILURE', error });
const taskFailure = error => ({ type: 'TASK_FAILURE', error });
const taskFailureNoUser = json => ({ type: 'TASK_FAILURE_NO_USER', json });
const taskSuccess = json => ({ type: 'TASK_SUCCESS', json });
const taskListFailure = error => ({ type: 'TASK_LIST_FAILURE', error });
const taskListSuccess = (json, visibility) => ({ type: 'TASK_LIST_SUCCESS', json, visibility });

// Get tasks
const getUserTasks = (userId, visibility) => async (dispatch) => {
  // clear the error box if it's displayed
  dispatch(clearError());

  dispatch(incrementProgress());

  // Send request to our API
  await fetch(
    // where to contact
    `/api/users/${userId}/tasks/${visibility}`,
    // what to send
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    return null;
  }).then((json) => {
    if (json.tasks) {
      return dispatch(taskListSuccess(json, visibility));
    }
    return dispatch(taskListFailure(new Error(json.error)));
  }).catch(error => dispatch(taskListFailure(new Error(error))));

  // turn off spinner
  return dispatch(decrementProgress());
};

// Make a task
const requestTask = (userId, params) => async (dispatch) => {
  // clear the error box if it's displayed
  dispatch(clearError());

  dispatch(incrementProgress());

  // Send params to our API
  await fetch(
    // where to contact
    `/api/users/${userId}/tasks`,
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
      if (json.task) {
        return dispatch(taskSuccess(json));
      } else if (json.no_user) {
        return dispatch(taskFailureNoUser(json));
      }
      return dispatch(taskFailure(new Error(json.error)));
    })
    .catch(error => dispatch(taskFailure(new Error(error))));

  // turn off spinner
  return dispatch(decrementProgress());
};

// Check a task
const checkTask = (userId, taskId, prevState) => async (dispatch) => {
  // clear the error box if it's displayed
  dispatch(clearError());

  dispatch(incrementProgress());

  // Send params to our API
  await fetch(
    // where to contact
    `/api/users/${userId}/checkTask/${taskId}`,
    // what to send
    {
      method: 'POST',
      body: JSON.stringify({ prevState }),
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
      if (json.task) {
        return dispatch(taskCheckSuccess(json));
      } else if (json.no_user) {
        return dispatch(taskCheckFailureNoUser(json));
      }
      return dispatch(taskCheckFailure(new Error(json.error)));
    })
    .catch(error => dispatch(taskCheckFailure(new Error(error))));

  // turn off spinner
  return dispatch(decrementProgress());
};

// Check a task
const editTask = (userId, taskId, text) => async (dispatch) => {
  // clear the error box if it's displayed
  dispatch(clearError());

  dispatch(incrementProgress());

  // Send params to our API
  await fetch(
    // where to contact
    `/api/users/${userId}/tasks/${taskId}`,
    // what to send
    {
      method: 'POST',
      body: JSON.stringify({ text }),
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
      if (json.task) {
        return dispatch(taskEditSuccess(json));
      } else if (json.no_user) {
        return dispatch(taskEditFailureNoUser(json));
      }
      return dispatch(taskEditFailure(new Error(json.error)));
    })
    .catch(error => dispatch(taskEditFailure(new Error(error))));

  // turn off spinner
  return dispatch(decrementProgress());
};

// Delete a task
const deleteTask = (userId, taskId, visibility) => async (dispatch) => {
  // clear the error box if it's displayed
  dispatch(clearError());

  dispatch(incrementProgress());

  // Send params to our API
  await fetch(
    // where to contact
    `/api/users/${userId}/tasks/${taskId}`,
    // what to send
    {
      method: 'DELETE',
      body: JSON.stringify({ visibility }),
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
      if (json.tasks) {
        return dispatch(taskDeleteSuccess(json, visibility));
      } else if (json.no_user) {
        return dispatch(taskDeleteFailureNoUser(json));
      }
      return dispatch(taskDeleteFailure(new Error(json.error)));
    })
    .catch(error => dispatch(taskDeleteFailure(new Error(error))));

  // turn off spinner
  return dispatch(decrementProgress());
};

export {
  // Action Creators
  taskCheckSuccess,
  taskCheckFailureNoUser,
  taskCheckFailure,
  taskDeleteSuccess,
  taskDeleteFailureNoUser,
  taskDeleteFailure,
  taskEditSuccess,
  taskEditFailureNoUser,
  taskEditFailure,
  taskFailure,
  taskFailureNoUser,
  taskSuccess,
  // Helpers
  checkTask,
  deleteTask,
  editTask,
  getUserTasks,
  requestTask,
};
