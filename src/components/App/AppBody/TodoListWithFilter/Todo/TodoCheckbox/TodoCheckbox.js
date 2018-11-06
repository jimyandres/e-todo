import React from 'react';

const TodoCheckbox = (props) => {
  const {
    onMouseEnter, onMouseLeave, onClick, checked, id, children, priority,
  } = props;
  let classNameStyle = 'divTodo ';
  classNameStyle += priority;
  return (
    <div
      className={classNameStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="checkbox">
        <input
          type="checkbox"
          onClick={onClick}
          checked={checked}
          readOnly={true}
          id={id}
        />
        <label htmlFor={id} className="checkboxLabel" />
      </div>
      {children}
    </div>
  );
};

export default TodoCheckbox;
