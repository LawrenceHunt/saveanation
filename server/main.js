import { Meteor } from 'meteor/meteor';
import '../imports/api/targets/targets.js';
import '../imports/api/posts/posts.js';
import '../imports/api/transactions/transactions.js';
import '../imports/api/savingsAccounts/savingsAccounts.js';
import '../imports/api/teams/teams.js';
import '../imports/api/profiles/profiles.js';


function setGravatars() {
  let users = Meteor.users.find( { md5hash: { $exists: false } } );
  users.forEach( ( user ) => {
    Meteor.users.update( { _id: user._id }, {
      $set: { md5hash: Gravatar.hash( user.emails[0].address ) }
    });
  });
}

Meteor.startup(() => {
  // code to run on server at startup
  Accounts.onCreateUser( ( options, user ) => {
    user.md5hash = Gravatar.hash( user.emails[0].address );
    return user;
  });
  setGravatars();
});
