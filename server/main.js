import { Meteor } from 'meteor/meteor';
import '../imports/api/targets/targets.js';
import '../imports/api/posts/posts.js';
import '../imports/api/transactions/transactions.js';
import '../imports/api/savingsAccounts/savingsAccounts.js';
import '../imports/api/teams/teams.js';

Meteor.methods({
  'user.signup'(username, email, password) {
    Accounts.createUser({username: username, email: email, password: password});
  },
  serverCreateUser(options) {
    Accounts.createUser({username: options.username, email: options.email, password: "123321"});
  }
});

Meteor.startup(() => {
  // code to run on server at startup
});
