import React from 'react';
import TodoCheckbox from '../TodoCheckbox';
import TodoPlain from '../TodoPlain';

const TodoDelete = (props) => {
  const { onTodoDelete } = props;
  return (
    <TodoCheckbox {...props}>
      <TodoPlain {...props} />
      <div className="dueDate"/>
      <div className="outer" onClick={onTodoDelete}>
        <div className="inner">
          <label className="labelClose">Delete!</label>
        </div>
      </div>
    </TodoCheckbox>
  );
};

export default TodoDelete;
