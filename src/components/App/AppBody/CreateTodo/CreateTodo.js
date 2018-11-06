import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreateTodo.css';
import Input from '../../Input';
import { requestTask } from '../../../../actions/tasks';

class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      priority: 'low',
      dueDate: '',
      completed: false,
      priorityOptions: ['low', 'medium', 'high'],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // Handle input changes
  handleInputChange(e) {
    this.setState({ [e.currentTarget.id]: e.target.value });
  }

  // Handle submission once all form data is valid
  handleValidSubmit(e) {
    e.preventDefault();
    const { dispatch, authentication } = this.props;
    const formData = this.state;
    dispatch(requestTask(authentication.id, formData));
  }

  render() {
    const { priorityOptions } = this.state;
    return (
      <div className="form">
        <form onSubmit={this.handleValidSubmit} className="register">
          <Input
            id="name"
            name="name"
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            placeholder="Add a new task!"
            type="text"
            required
            value={this.state.name}
          />
          <br />
          <div className="div task">
            <Input
              id="dueDate"
              name="dueDate"
              onChange={this.handleInputChange}
              onKeyPress={this.handleKeyPress}
              placeholder="Due date"
              type="date"
              required
              className="task"
              value={this.state.dueDate}
            />
            <select className="input task" id="priority" name="priority" required onChange={this.handleInputChange}>
              {
                priorityOptions.map(op => (
                  <option value={op}>{op}</option>
                ))
              }
            </select>
          </div>
          <br />
          <button type="submit" className="btn login">Add</button>
        </form>
      </div>
    );
  }
}

/*
<Input
  id="priority"
  name="priority"
  onChange={this.handleInputChange}
  onKeyPress={this.handleKeyPress}
  placeholder="priority"
  type="text"
  required
  className="task"
  value={this.state.priority}
/>
*/

const mapStateToProps = state => ({
  progress: state.progress,
  authentication: state.authentication,
});

export default connect(mapStateToProps)(CreateTodo);
