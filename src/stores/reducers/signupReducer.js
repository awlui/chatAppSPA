export const signup = function(state, action) {
  switch(action.type) {
    case "KP_SIGNUP_USERNAME":
      return { ...state, username: { ...state.username, value: action.username} }
    case "KP_SIGNUP_PASSWORD":
      return { ...state, password: {...state.password, value: action.password} }
    case "EMPTY_SIGNUP":
      return {
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
   }
    case "KP_EMAIL":
      return { ...state, email: {...state.password, value: action.email}}
    case "KP_FIRSTNAME":
      return { ...state, firstName: {...state.firstName, value: action.firstName}}
    case "KP_LASTNAME":
      return { ...state, lastName: {...state.lastName, value: action.lastName}}
    case "PASS_VALIDATION":
      return {
        ...state, [action.validation.field]: { ...state[action.validation.field], valid: true}
      }
    case "FAIL_VALIDATION":
      return {
        ...state, [action.validation.field]: { ...state[action.validation.field], valid: false}
      }
    case "MAKE_DIRTY":
        return {
          ...state, [action.field]: { ...state[action.field], dirty: true}
        }
    case "FOCUS_FIELD":
      return {
        ...state, [action.field]: {...state[action.field], inFocus: true}
      }
    case "FOCUS_FIELD_FALSE":
      return {
        ...state, [action.field]: {...state[action.field], inFocus: false}
      }
    case "CHECKING_USERNAME":
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
    case "ALL_FIELDS_INVALID":
      return {
        ...state, allInvalid: true
      }
    default:
      return state;
  }
}