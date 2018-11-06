import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { checkAll } from '../../../../actionCreators/index.js';
import { withRouter } from 'react-router'
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkAll: false,
    };

    this.onClickCheckAll = this.onClickCheckAll.bind(this);
  }

  onClickCheckAll() {
    const { dispatch, match, tasks } = this.props;
    const visibility = match.params.visibility ? match.params.visibility : 'all';
    // this.setState((prevState) => {
    //   dispatch(checkAll(!prevState.checkAll,visibility,tasks));
    //   return {checkAll: !prevState.checkAll}
    // });
  }

  render() {
    const { children } = this.props;
    const { checkAll } = this.state;

    let arrowClass = 'arrow ';
    arrowClass += checkAll ? 'checked' : '';

    return (
      <div className="Header">
        <button hidden className={arrowClass} onClick={() => this.onClickCheckAll()}>
          <svg width="30px" height="20px" viewBox="0 0 30 15">
            <polyline
              fill="none"
              stroke="#00ABCC"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,0 15,15 30,0"
            />
          </svg>
        </button>
        {children}
      </div>
    );
  }
}

Header = withRouter(connect()(Header));

export default Header;
