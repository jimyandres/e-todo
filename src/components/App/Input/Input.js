import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'text',
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.setState({
      type: 'date',
    });
  }

  onBlur() {
    this.setState({
      type: 'text',
    });
  }

  render() {
    const {
      id, name, onChange, onKeyPress, placeholder, type, value,
      className = '',
    } = this.props;

    if (type === 'date') {
      return (
        <input
          className={`input ${className}`}
          id={id}
          name={name}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          required
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          type={this.state.type}
          value={value}
        />
      );
    }
    return (
      <input
        className={`input ${className}`}
        id={id}
        name={name}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        required
        type={type}
        value={value}
      />
    );
  }
}

export default Input;
