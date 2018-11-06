import React, { Component } from 'react';
import { connect } from 'react-redux';

import Warning from './Warning';

class WarningContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { error } = this.props;
    if (error.isError) {
      return (
        <Warning error={error} {...this.props} />
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps)(WarningContainer);
