import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'redxjs';
import store from './stores/redxjsStore';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
