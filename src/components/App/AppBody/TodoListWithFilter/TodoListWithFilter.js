import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../../../../reducers';
import { getUserTasks, checkTask } from '../../../../actions/tasks';
import Todo from './Todo';
import './TodoListWithFilter.css';

const TodoList = (props) => {
  const { todos, onTodoCheck, userId } = props;
  const noTodos = !(todos.length > 0);
  return (
    <ul>
      {noTodos
        ? <span>No tasks to show!</span>
        : todos.map(todo =>
          (<Todo
            key={todo._id}
            onClick={() => onTodoCheck(userId, todo._id, todo.completed)}
            checked={todo.completed}
            {...todo}
            {...props}
          />))
      }
    </ul>
  );
};

class TodoListWithFilter extends Component {
  constructor(props) {
    super(props);

    this.checkTodo = this.checkTodo.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.visibility !== prevProps.visibility) {
      this.fetchData();
    }
  }

  fetchData() {
    const {
      visibility, dispatch, authentication,
    } = this.props;
    dispatch(getUserTasks(authentication.id, visibility));
  }

  checkTodo(userId, taskId, prevState) {
    const { dispatch } = this.props;
    dispatch(checkTask(userId, taskId, prevState));
    this.fetchData();
  }

  render() {
    const {
      getCount, editTodo, todos, visibility, tasks, authentication
    } = this.props;

    return (
      <TodoList
        onTodoCheck={this.checkTodo}
        onTodoEdit={editTodo}
        getCount={getCount}
        todos={todos}
        visibility={visibility}
        tasks={tasks}
        userId={authentication._id}
      />
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const visibility = match.params.visibility || 'all';
  return {
    todos: getVisibleTodos(state, visibility),
    authentication: state.authentication,
    visibility,
  };
};

TodoListWithFilter = withRouter(connect(
  mapStateToProps, // actions,
)(TodoListWithFilter));

export default TodoListWithFilter;
