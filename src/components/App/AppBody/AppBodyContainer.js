import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBody from './AppBody';

class AppBodyContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppBody {...this.props} />;
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  userTasks: state.list.userTasks,
});

export default connect(mapStateToProps)(AppBodyContainer);
