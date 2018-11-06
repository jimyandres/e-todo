import React from 'react';
import { connect } from 'react-redux';

import HomePage from './HomePage';

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { isLoggedIn } = this.props.authentication;
    return (
      <HomePage isLoggedIn={isLoggedIn} />
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});

export default connect(mapStateToProps)(HomePageContainer);
