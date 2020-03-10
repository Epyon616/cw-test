import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import App from './components/App';

const store = configureStore();
const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <Router basename="/">
      <App />
    </Router>
  </Provider>,
  rootElement
);
