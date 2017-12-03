import {createStore} from 'redxjs';
import {signup} from './reducers/signupReducer';
import {auth} from './reducers/authReducer';
import {login} from './reducers/loginReducer';

let initialState = {
  auth: {
  },
  signup: {
    username: {
      value: '',
      dirty: false,
      valid: false
    },
    firstName: {
      value: '',
      dirty: false,
      valid: false
    },
    lastName: {
      value: '',
      dirty: false,
      valid: false
    },
    email: {
      value: '',
      dirty: false,
      valid: false
    },
    password: {
      value: '',
      dirty: false,
      valid: false
    }
  },
  login: {
      loginFieldsValid: true,
  }
}
let store = createStore({
  auth,
  signup,
  login

},
initialState
)
export default store;
