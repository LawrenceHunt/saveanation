import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = Meteor.users;

Users.allow({
  // insert: () => false,
  update: () => true,
  // remove: () => false
});


if(Meteor.isServer) {
  // Only publish user accounts that belong to the current user
  Meteor.publish('users', function targetsPublication() {
    if (this.userId) {
      return Meteor.users.find({_id: this.userId}).fetch();
      }
    });
}

Meteor.methods({
  'profiles.edit'(emailAddress, userName, firstName, lastName) {
    check(emailAddress, String);
    check(userName, String);
    check(firstName, String);
    check(lastName, String);

    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Meteor.users.update(this.userId, {$set: {
      username: "MASSIVE PEST"
      // emails[0].address: emailAddress
          // currentUser[0].emails[0].address: emailAddress,
          // currentUser[0].username: userName,
          // currentUser[0].profile.firstName: firstName,
          // currentUser[0].profile.lastName: lastName
          // profile : { firstName: firstName, lastName: lastName }
        }
      });
  }
});
