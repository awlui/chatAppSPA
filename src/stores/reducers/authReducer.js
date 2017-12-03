export const auth = function(state, action) {

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