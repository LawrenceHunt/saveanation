import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.SignUp.events({
  'submit .sign-up-form': function (event, template) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var $usernameInput = $form.find('.username-input').eq(0);
    var $firstNameInput = $form.find('.first-name-input').eq(0);
    var $lastNameInput = $form.find('.last-name-input').eq(0);
    var $emailInput = $form.find('.email-address-input').eq(0);
    var $passwordInput = $form.find('.password-input').eq(0);

    var userName = $usernameInput.val() || '';
    var firstName = $firstNameInput.val() || '';
    var lastName = $lastNameInput.val() || '';
    var emailAddress = $emailInput.val() || '';
    var password = $passwordInput.val() || '';

    //trim
    userName = userName.replace(/^\s*|\s*$/g, '');
    firstName = firstName.replace(/^\s*|\s*$/g, '');
    lastName = lastName.replace(/^\s*|\s*$/g, '');
    emailAddress = emailAddress.replace(/^\s*|\s*$/g, '');
    password = password.replace(/^\s*|\s*$/g, '');

    //validate
    var isValidEmail = checkEmailIsValid(emailAddress);
    var isValidPassword = checkPasswordIsValid(password);

    if (!isValidEmail || !isValidPassword) {
      if (!isValidEmail) {
        throw new Error('Invalid email address');
      }
      if (!isValidPassword) {
        throw new Error('Your password must be at least 8 characters long');
      }
    } else {
      Meteor.call('userSignUp', userName, firstName, lastName, emailAddress, password);
      // Accounts.createUser({
      //   username: userName,
      //   firstname: firstName,
      //   lastname: lastName,
      //   email: emailAddress,
      //   password: password
      // }, function (error) {
      //   if (error) {
      //     throw new Error('Account creation failed for unknown reasons :(');
      //   }
      // });
    }
  }
});
