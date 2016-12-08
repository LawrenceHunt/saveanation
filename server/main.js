import { Meteor } from 'meteor/meteor';

<<<<<<< HEAD
import '../imports/api/deposits/deposits.js';
import '../imports/api/targets/targets.js';
=======
import '../imports/api/posts/posts.js';
import '../imports/api/transactions/transactions.js';

Meteor.methods({
  'user.signup'(email, password) {
    Accounts.createUser({email: email, password: password});
  }
});
>>>>>>> master

Meteor.startup(() => {
  // code to run on server at startup
});
