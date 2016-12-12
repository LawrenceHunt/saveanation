import { Meteor } from 'meteor/meteor';
import '../imports/api/targets/targets.js';
import '../imports/api/posts/posts.js';
import '../imports/api/transactions/transactions.js';
import '../imports/api/savingsAccounts/savingsAccounts.js';
import '../imports/api/teams/teams.js';
import '../imports/api/profiles/profiles.js';

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
    homeRoutePath: '/',
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
  // code to run on server at startup
  Accounts.onCreateUser( ( options, user ) => {
    if (user.emails) {
      user.email = user.emails[0].address;
    } else if(user.services.facebook) {
      user.email = user.services.facebook.email;
    }
    user.md5hash = Gravatar.hash( user.email );
    return user;
  });
});
