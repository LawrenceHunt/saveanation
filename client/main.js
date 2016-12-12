import { Meteor } from 'meteor/meteor';
import '../imports/startup/client';
import { Users } from '../imports/api/profiles/profiles.js'

var postSignUp = function() {
  console.log("hi from client");
  FlowRouter.go('addprofile');
}

AccountsTemplates.configure({

    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: true,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // // Privacy Policy and Terms of Use
    // privacyUrl: 'privacy',
    // termsUrl: 'terms-of-use',

    // Redirects
    redirectTimeout: 4000,

    // Texts
    texts: {
      button: {
          signUp: "Register Now!"
      },
      socialSignUp: "Register",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "Recover Your Password"
      },
    },
});


Accounts.ui.config({
  requestPermissions: {
    facebook: ['email']  }
});

AccountsTemplates.addField({
   _id: 'username',
   type: 'text',
   required: true,
   func: function(value){
       if (Meteor.isClient) {
           console.log("Validating username...");
           var self = this;
           Meteor.call("userExists", value, function(err, userExists){
               if (!userExists)
                   self.setSuccess();
               else
                   self.setError(userExists);
               self.setValidating(false);
           });
           return;
       }
       // Server
       return Meteor.call("userExists", value);
   },
  });

  AccountsTemplates.addField({
      _id: 'firstName',
      type: 'text',
      displayName: "First Name",
      required: true
  });

  AccountsTemplates.addField({
      _id: 'lastName',
      type: 'text',
      displayName: "Last Name",
      required: true
  });

  AccountsTemplates.addField({
      _id: "avatar",
      type: "select",
      displayName: "Avatar",
      select: [
          {
              text: "CoolDudeBro",
              value: "1",
          },
          {
              text: "AwesomeWomanLady",
              value: "2",
          },
      ],
  });
