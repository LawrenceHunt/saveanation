import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = Meteor.users;


if(Meteor.isServer) {
  // Only publish user accounts that belong to the current user
  Meteor.publish('userData', function () {
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
    Users.update({createdBy: this.userId},{$set: {
          email: emailAddress,
          username: userName,
          firstName: firstName,
          lastName: lastName,
        }
      });
  },
});
