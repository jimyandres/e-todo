import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './RegisterPage.css';
import Input from '../Input';
import AppTitle from '../AppTitle';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      username: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // Handle input changes
  handleInputChange(e) {
    this.setState({ [e.currentTarget.id]: e.target.value });
  }

  // Handle submission once all form data is valid
  handleValidSubmit(e) {
    e.preventDefault();
    const { registerFunction } = this.props;
    const { password, passwordConfirmation } = this.state;
    if (password !== passwordConfirmation) return;
    const formData = this.state;
    registerFunction(formData);
  }

  render() {
    const { password, passwordConfirmation } = this.state;
    const match = password === passwordConfirmation;
    return (
      <div>
        <AppTitle />
        <div className="register-panel">
          <div>
            <h2>Register Form</h2>
          </div>
          <div className="form">
            <form onSubmit={this.handleValidSubmit} className="register">
              <Input
                id="email"
                name="email"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="E-Mail"
                type="email"
                required
                value={this.state.email}
              />
              <br />
              <Input
                id="password"
                name="password"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="Password"
                type="password"
                required
                value={this.state.password}
              />
              <br />
              <Input
                id="passwordConfirmation"
                name="passwordConfirmation"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="Password confirmation"
                type="password"
                required
                className={match ? ' match' : ' no_match'}
                value={this.state.passwordConfirmation}
              />
              <br />
              <span>Password must be at least eigth characters length.</span>
              <span>
                We recommend a password service like&nbsp;
                <a href="https://www.lastpass.com/" target="_blank" rel="noopener noreferrer">LastPass</a>
                &nbsp;or <a href="https://1password.com/" target="_blank" rel="noopener noreferrer">1Password</a>
              </span>
              <br />
              <br />
              <Input
                id="username"
                name="username"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="Username"
                type="text"
                required
                value={this.state.username}
              />
              <br />
              <Input
                id="firstName"
                name="firstName"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="First Name"
                type="text"
                required
                value={this.state.firstName}
              />
              <br />
              <Input
                id="lastName"
                name="lastName"
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
                placeholder="Last Name"
                type="text"
                required
                value={this.state.lastName}
              />
              <br />
              <button type="submit" className="btn login">Register</button>
              <Link className="btn login back" to="/">Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
