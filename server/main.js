import { Meteor } from 'meteor/meteor';
import '../imports/api/targets/targets.js';
import '../imports/api/posts/posts.js';
import '../imports/api/transactions/transactions.js';
import '../imports/api/savingsAccounts/savingsAccounts.js';

// Meteor.methods({
//   'user.signup'(email, password) {
//     Accounts.createUser({email: email, password: password});
//   }
// });

Meteor.startup(() => {
  // code to run on server at startup
});
