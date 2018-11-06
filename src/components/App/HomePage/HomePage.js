import React from 'react';

import AppLogin from './AppLogin';
import AppTitle from '../AppTitle';
import AppBody from '../AppBody';
import AuthControls from './AuthControls';

const HomePage = (props) => {
  const { isLoggedIn } = props;
  return (
    <div>
      { isLoggedIn ?
        <div >
          <AuthControls />
          <div>
            <AppTitle />
            <AppBody />
          </div>
        </div>
        :
        <div>
          <AppTitle />
          <AppLogin />
        </div>
      }
    </div>
  );
};

export default HomePage;
