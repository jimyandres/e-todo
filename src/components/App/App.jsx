import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import Warning from './Warning';

const App = (props) => {
  const { authentication, progress } = props;
  return (
    <Router>
      <div className="App">
        <Warning />
        <div className="TodoApp">
          <section>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/account/register" component={RegisterPage} />
          </section>
        </div>
      </div>
    </Router>
  );
};


export default App;
