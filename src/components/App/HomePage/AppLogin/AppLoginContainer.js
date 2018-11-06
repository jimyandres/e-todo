import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logUserIn } from '../../../../actions/authentication';

import AppLogin from './AppLogin';

class AppLoginContainer extends Component {
  constructor(props) {
    super(props);

    this.logUserInFunction = this.logUserInFunction.bind(this);
  }

  logUserInFunction(userData) {
    const { dispatch } = this.props;
    dispatch(logUserIn(userData));
  }

  render() {
    const { authentication } = this.props;

    if (authentication.isLoggedIn) {
      return (<Redirect to="/" />);
    }

    return (
      <div>
        <AppLogin loginFunction={this.logUserInFunction} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});

export default connect(mapStateToProps)(AppLoginContainer);
