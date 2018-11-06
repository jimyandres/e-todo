import { combineReducers } from 'redux';
import AuthenticationReducer from './authentication';
import ErrorReducer from './error';
import ListReducer, * as fromById from './list';
import createList, * as fromList from './createList';
import ProgressReducer from './progress';

const listByVisibility = combineReducers({
  all: createList('all'),
  pending: createList('pending'),
  completed: createList('completed'),
});

const reducers = {
  error: ErrorReducer,
  list: ListReducer,
  listByVisibility,
  progress: ProgressReducer,
  authentication: AuthenticationReducer,
};

export default combineReducers(reducers);

export const getVisibleTodos = (state, visibility) => (
  fromList.getIds(state.listByVisibility[visibility])
);
