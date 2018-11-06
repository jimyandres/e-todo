import React from 'react';

const LoginHeader = ({ authentication, onLogout }) =>
  (
    <div className="login-header">
      <span className="login-text">
        <span className="username">
          {authentication && authentication.firstName ? authentication.username : '?'}
        </span>
      </span>
      <div className="logout" >
        <button className="btn logout" onClick={onLogout}>
          sign out
        </button>
      </div>
    </div>
  );

export default LoginHeader;
