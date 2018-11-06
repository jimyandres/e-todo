import * as handle from './handleTodos';

const createList = visibility => (state = [], action) => {
  switch (action.type) {
    case 'TASK_LIST_SUCCESS':
    case 'TASK_DELETE_SUCCESS':
      return visibility === action.visibility
        ? action.json.tasks
        : state;
    case 'TASK_SUCCESS':
      return visibility !== 'completed'
        ? [...state, action.json.task]
        : state;
    case 'TASK_CHECK_SUCCESS':
      return handle.checked(state, action, visibility);
    case 'CHECK_ALL_SUCCESS':
    case 'CLEAR_COMPLETED_SUCCESS':
      return visibility !== action.visibility
        ? action.json.tasks
        : state;
    default:
      return state;
  }
};

export default createList;

export const getIds = state => state;
