import React from 'react';
import TodoCheckbox from '../TodoCheckbox';

const TodoEdit = (props) => {
  const {
    onChange, onKeyPress, value, handleClickOutside,
  } = props;
  return (
    <TodoCheckbox {...props} >
      <input
        className="input"
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyPress}
        onBlur={handleClickOutside}
        autoFocus
      />
    </TodoCheckbox>
  );
};

export default TodoEdit;
