import {createStore} from 'redxjs';


let auth = function(state, action) {

  switch(action.type) {

    case "AUTHENTICATE":
      return {
        ...state, token: action.token
      }
    case "DEAUTHENTICATE":
      return {
        ...state, token: null
      }
    default:
      return state;
  }
}

let signup = function(state, action) {
  switch(action.type) {
    case "KP_SIGNUP_USERNAME":
      return { ...state, username: action.username }
    case "KP_SIGNUP_PASSWORD":
      return { ...state, password: action.password }
    case "EMPTY_SIGNUP":
      return {}
    case "KP_EMAIL":
      return { ...state, email: action.email}
    case "KP_FIRSTNAME":
      return { ...state, firstName: action.firstName}
    case "KP_LASTNAME":
      return { ...state, lastName: action.lastName}
    case "PASS_VALIDATION":
      return {
        ...state, validations: { ...state.validations, ...action.validation}
      }
    case "CHECKING_USERNAME":
    console.log("CHECKING", action.value)
      return {
        ...state, checkingExistence: action.value
      }
    case "USERNAME_EXISTS":
      return {
        ...state, exists: true
      }
    case "USERNAME_DOESNT_EXIST":
      return {
        ...state, exists: false
      }
    default:
      return state;
  }
}
let login = function(state, action) {
  switch(action.type) {
    case "KP_LOGIN_USERNAME":
      return { ...state, username: action.username }
    case "KP_LOGIN_PASSWORD":
      return { ...state, password: action.password }
    case "RESET_LOGIN":
      return {
        ...state, loginFieldsValid: true, username: '', password: ''
      }
    case "UNAUTHORIZED":
      return {
        ...state, loginFieldsValid: false, isLoggingIn: false
      }
    case "IS_LOGGING_IN":
    console.log('isLoggingIn');
      return {
        ...state, isLoggingIn: true
      }
    case "AUTHENTICATE":
      return {
        ...state, isLoggingIn: false
      }
    default:
      return state;
  }
}
let initialState = {
  auth: {
  },
  signup: {
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
