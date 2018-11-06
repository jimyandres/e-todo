import React, { Component } from 'react';

import './Warning.css';
import { clearError } from '../../../actions/error';

class Warning extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: false,
      message: '',
    };

    this.setError = this.setError.bind(this);
    this.closeWarning = this.closeWarning.bind(this);
  }

  componentDidMount() {
    this.setError();
  }

  setError() {
    const { isError, error } = this.props.error;
    this.setState({
      display: isError,
      message: error.message,
    });
  }

  closeWarning() {
    this.setState({
      display: false,
    });

    const { dispatch } = this.props;

    dispatch(clearError())
  }

  render() {
    const { message, display } = this.state;
    if (display) {
      return (
        <div className="notice-warning">
          <div className="notice-close" onClick={this.closeWarning}>&#215;</div>
          <strong>Warning!</strong> {message}
        </div>
      );
    }
    return (<div />);
  }
};

export default Warning;
