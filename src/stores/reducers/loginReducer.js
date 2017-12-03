export const login = function(state, action) {
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
