checkEmailIsValid = function (aString) {
  aString = aString || '';
  return aString.length > 1 && aString.indexOf('@') > -1;
}

checkPasswordIsValid = function (aString) {
  aString = aString || '';
  return aString.length > 7;
}
