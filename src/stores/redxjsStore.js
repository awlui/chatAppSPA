import {createStore} from 'redxjs';


//AuthToken !null means that the user is authenticated
let authReducer = function(state, action) {

  switch(action.type) {
    case "KEYPRESS_USERNAME":
      return { ...state, username: action.username }
    case "KEYPRESS_PASSWORD":
      return { ...state, password: action.password }
    case "EMPTY_SIGNUP":
      return { ...state, username: undefined, password: undefined}
    case "KEYPRESS_EMAIL":
      return { ...state, email: action.email}
    case "KEYPRESS_FNAME":
      return { ...state, firstName: action.firstName}
    case "KEYPRESS_LNAME":
      return { ...state, lastName: action.lastName}
    case "AUTHENTICATE":
      return {
        ...state, authToken: action.token
      }
      break;
    case "DEAUTHENTICATE":
      return {
        ...state, authToken: null
      }
    default:
      return state;
  }
}
let initialState = {
  auth: {
    message: "initial state"
  }
}
let store = createStore({
  auth: authReducer
},
initialState
)
export default store;
