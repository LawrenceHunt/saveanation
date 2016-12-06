import { Meteor } from 'meteor/meteor';
import { checkEmailIsValid, checkPasswordIsValid } from '../lib/helpers'

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'userSignUp': function(userName, firstName, lastName, emailAddress, password){

    debugger;

    Accounts.createUser({
      username: userName,
      firstname: firstName,
      lastname: lastName,
      email: emailAddress,
      password: password
    });

  }
});
