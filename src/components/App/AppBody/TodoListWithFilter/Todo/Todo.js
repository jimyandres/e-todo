import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import TodoDelete from './TodoDelete';
import TodoEdit from './TodoEdit';
import TodoPlain from './TodoPlain';
import TodoCheckbox from './TodoCheckbox';
import { editTask, deleteTask } from '../../../../../actions/tasks';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverDelete: false,
      editing: false,
      newText: '',
      dueDate: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.isDueDate = this.isDueDate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleTodoDelete = this.handleTodoDelete.bind(this);
  }

  componentDidMount() {
    this.setState({ newText: this.props.name, dueDate: this.isDueDate() });
  }

  onMouseEnter() {
    this.setState({ hoverDelete: true });
  }

  onMouseLeave() {
    this.setState({ hoverDelete: false });
  }

  onDoubleClick() {
    this.setState({ editing: true });
  }

  isDueDate() {
    // Chekc if the due date is close to the current day
    // random number (3)
    return moment(this.props.dueDate).add(-3, 'day') < moment();
  }

  handleInput(newText) {
    this.setState({ newText });
  }

  handleClickOutside() {
    this.setState({ editing: false, newText: this.props.name });
  }

  handleKeyPress(key) {
    const { dispatch, _id, user } = this.props;
    const text = this.state.newText.trim();
    if (key === 'Enter' && text !== '') {
      dispatch(editTask(user, _id, text));
      this.setState({ editing: false, newText: text });
    } else if (key === 'Escape') {
      this.setState({ editing: false, newText: this.props.name });
    }
  }

  handleTodoDelete() {
    const {
      dispatch, user, _id, visibility,
    } = this.props;
    dispatch(deleteTask(user, _id, visibility));
  }

  render() {
    const {
      getCount, _id, visibility, priority,
    } = this.props;
    const {
      hoverDelete, editing, newText, dueDate,
    } = this.state;
    return (
      <TodoWithInput
        isEditing={editing}
        id={_id}
        value={newText}
        text={newText}
        onChange={e => this.handleInput(e.target.value)}
        onKeyPress={e => this.handleKeyPress(e.key)}

        priority={priority}
        showWarning={dueDate}
        hoverDelete={hoverDelete}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onDoubleClick={this.onDoubleClick}
        onTodoDelete={this.handleTodoDelete}
        handleClickOutside={this.handleClickOutside}
        {...this.props}
      />
    );
  }
}

const withDelete = TodoComponent =>
  props =>
    (
      props.hoverDelete
        ? <TodoDelete {...props} />
        :
        <TodoComponent {...props}>
          <TodoPlain {...props} />
          <span
            className={`dueDate ${props.showWarning && !props.checked
              ? 'warning'
              : props.checked ? ' checked' : ''}`}
          >
            {moment(props.dueDate).format('DD/MM/YYYY')}
          </span>
        </TodoComponent>
    );

const TodoWithDelete = withDelete(TodoCheckbox);

const withInput = TodoComponent =>
  props =>
    (
      props.isEditing
        ? <TodoEdit {...props} />
        : <TodoComponent {...props} />
    );

const TodoWithInput = withInput(TodoWithDelete);

export default connect()(Todo);
