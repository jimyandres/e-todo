import React from 'react';

const TodoPlain = (props) => {
  const {
    onDoubleClick, text, checked,
  } = props;
  let todoStyle = 'todoText ';
  todoStyle += checked ? 'checked' : '';
  return (
    <div
      className={todoStyle}
      onDoubleClick={onDoubleClick}
    >
      {text}
    </div>
  );
};

export default TodoPlain;
