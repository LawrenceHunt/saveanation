import { Meteor } from 'meteor/meteor';
import '../imports/api/targets/targets.js';
import '../imports/api/posts/posts.js';
import '../imports/api/transactions/transactions.js';
import '../imports/api/savingsAccounts/savingsAccounts.js';
import '../imports/api/teams/teams.js';
import '../imports/api/profiles/profiles.js';

Meteor.methods({
  'user.signup'(username, email, password) {
    Accounts.createUser({username: username, email: email, password: password});
  }
});

Meteor.startup(() => {
  // code to run on server at startup
});
