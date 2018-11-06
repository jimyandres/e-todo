import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginHeader from './LoginHeader';
import './AuthControls.css';
import { logUserOut } from '../../../../actions/authentication';

class AuthControls extends Component {
  constructor(props) {
    super(props);

    this.logOutClick = this.logOutClick.bind(this);
  }

  logOutClick(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logUserOut());
  }

  render() {
    return (
      <LoginHeader authentication={this.props.authentication} onLogout={this.logOutClick} />
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});

export default connect(mapStateToProps)(AuthControls);
