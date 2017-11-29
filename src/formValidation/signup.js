const passwordVal = function(password, {minLength = 6, maxLength = 20} = {}) {
  return (typeof password === 'string' && password.length >= minLength && password.length <= maxLength);
}
const usernameVal = function(username, {minLength = 6, maxLength = 20} = {}) {
  return (typeof username === 'string' && username.length >= minLength && username.length <= maxLength );
}
const emailVal = function(email, options) {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
  }
const notEmptyVal = function(value) {
  return !!value;
}



export {
  emailVal,
  usernameVal,
  passwordVal,
  notEmptyVal
}

