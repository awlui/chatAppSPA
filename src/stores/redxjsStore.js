import {createStore} from 'redxjs';


//AuthToken !null means that the user is authenticated
let auth = function(state, action) {

  switch(action.type) {
    // case "KEYPRESS_USERNAME":
    //   return { ...state, username: action.username }
    // case "KEYPRESS_PASSWORD":
    //   return { ...state, password: action.password }
    // case "EMPTY_SIGNUP":
    //   return { ...state, username: undefined, password: undefined, firstName: undefined, lastName: undefined, email: undefined, validations: undefined}
    // case "KEYPRESS_EMAIL":
    //   return { ...state, email: action.email}
    // case "KEYPRESS_FNAME":
    //   return { ...state, firstName: action.firstName}
    // case "KEYPRESS_LNAME":
    //   return { ...state, lastName: action.lastName}
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
    case "SIGNUP_VALIDATION_FAIL":
      return {
        ...state, validations: action.validations
      }
    case "SIGNUP_VALIDATION_SUCCESS":
      return {
        ...state, validations: undefined
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
        ...state, loginFieldsValid: false
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
