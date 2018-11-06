import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import './css/e-todo.scss';

import DevTools from './components/shared/DevTools';
import configureStore from './store';

import App from './components/App';

const Store = configureStore();

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={Store} >
        <div>
          <Component headline="Headline" />
          <DevTools />
        </div>
      </Provider>
    </AppContainer>,
    document.querySelector('#react-app'),
  );
};

renderApp(App);

if (module && module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(App);
  });
}
