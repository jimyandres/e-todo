import React from 'react';
import Header from './Header';
import CreateTodo from './CreateTodo';
import TodoListWithFilter from './TodoListWithFilter';

const AppBody = props =>
  (
    <div>
      <Header {...props} >
        <CreateTodo {...props} />
      </Header>
      <TodoListWithFilter {...props} />
    </div>
  );

export default AppBody;
