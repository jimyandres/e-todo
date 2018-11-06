import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AppLogin.css';
import Input from '../../Input';

class AppLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // update state as email value changes
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  // update states as password value changes
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  // Handle submission once all form data is valid
  handleValidSubmit(e) {
    e.preventDefault();
    const { loginFunction } = this.props;
    const formData = this.state;
    loginFunction(formData);
  }

  render() {
    return (
      <div className="login-panel">
        <div>
          <h2>Log Into TO DO App!</h2>
        </div>
        <div className="form">
          <form onSubmit={this.handleValidSubmit} className="login">
            <Input
              id="userEmail"
              name="email"
              onChange={this.handleEmailChange}
              onKeyPress={this.handleKeyPress}
              placeholder="E-Mail"
              type="email"
              value={this.state.email}
            />
            <br />
            <Input
              id="userPassword"
              name="password"
              onChange={this.handlePasswordChange}
              onKeyPress={this.handleKeyPress}
              placeholder="Password"
              type="password"
              value={this.state.password}
            />
            <br />
            <button type="submit" className="btn login">LogIn</button>
            <Link className="btn login register" to="/account/register">Register</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default AppLogin;
