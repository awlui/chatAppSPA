import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'redxjs';
import store from './stores/redxjsStore';
import './index.css';
import App from './App';


// somewhere in a render function ...

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
