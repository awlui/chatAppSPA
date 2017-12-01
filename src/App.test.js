import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider, createStore} from 'redxjs';
let store;
let initialState = {
  auth: {
    message: "initial state",
    token: 'fakeAuthToken'
  }
}
const reducer = function(state, action) {
  switch(action.type) {
    case 'fakeTypeOne':
      break;
    case 'fakeTypeTwo':
    break;
    default:
      return state;
  }
}
beforeEach(() => {
  store = createStore({
    auth: reducer,
    login: reducer,
    signup: reducer
  }, initialState);
});
describe("Validation" , () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  });
})
