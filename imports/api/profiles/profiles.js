import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = Meteor.users;

if(Meteor.isServer) {
  // Only publish user accounts that belong to the current user
  Meteor.publish('users', function () {
    if (this.userId) {
      return Meteor.users.find({});
      }
    });
}

Meteor.methods({
  'profiles.edit'(userName, firstName, lastName, avatar) {
    check(userName, String);
    check(firstName, String);
    check(lastName, String);
    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    console.log(Meteor.users.find({"profile.username": userName}));
    if(Meteor.users.findOne({"profile.username": userName})) {
      alert("This name is already taken");
      throw new Error("username already taken");
    }
    Meteor.users.update(this.userId, {$set: {
          profile: { username: userName, firstName: firstName, lastName: lastName, avatar: avatar }
        }
      });
  }
});
