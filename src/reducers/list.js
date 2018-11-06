const initialState = {
  newUser: false,
  userTasks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TASK_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.lastTask = action.json.task;
      return newState;
    }
    case 'ADD_USER_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.newUser = false;
      return newState;
    }
    case 'TASK_FAILURE_NO_USER': {
      const newState = Object.assign({}, state);
      newState.newUser = action.json.no_user;
      return newState;
    }
    case 'TASK_LIST_SUCCESS': {
      const newState = Object.assign({}, state);
      newState.userTasks = action.json.tasks;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;

export const getTodo = (state, id) => state[id];
