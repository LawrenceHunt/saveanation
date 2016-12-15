import { Meteor } from 'meteor/meteor';
import '../imports/api/targets/targets.js';
import '../imports/api/posts/posts.js';
import '../imports/api/transactions/transactions.js';
import '../imports/api/savingsAccounts/savingsAccounts.js';
import '../imports/api/teams/teams.js';
import '../imports/api/profiles/profiles.js';
import '../imports/api/tower/tower.js';
import '../imports/api/tower/coinBank.js';

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

    // Redirects
    homeRoutePath: '/home',
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

Meteor.startup(() => {
  Accounts.onCreateUser( ( options, user ) => {
    user.profile = options.profile;
    user.profile.username = user.username;
    if (user.emails) {
      user.email = user.emails[0].address;
    }
    return user;
  });
  Meteor.publish('emojis', function() {
    return Emojis.find();
  });

});

Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "You have been selected to participate in building a better future!"
     + " To activate your account, simply click the link below:\n\n"
     + url;
};
