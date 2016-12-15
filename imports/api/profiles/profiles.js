import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = Meteor.users;

if(Meteor.isServer) {
  // Only publish user accounts that belong to the current user
  Meteor.publish('users', function () {
    if (this.userId) {
        return Meteor.users.find({},{fields: {'_id' : 1, 'profile': 1}});
      }
    });
}

Meteor.methods({
  'profiles.edit'(userName, firstName, lastName) {
    check(userName, String);
    check(firstName, String);
    check(lastName, String);
    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    var currentUserName = Meteor.user().profile.username;
    var currentAvatar = Meteor.user().profile.avatar;
    if(currentUserName != userName && Meteor.users.findOne({"profile.username": userName})) {
      alert("This name is already taken");
      throw new Error("username already taken");
    }
    Meteor.users.update(this.userId, {$set: {
          username: userName,
          profile: { username: userName, firstName: firstName, lastName: lastName, avatar: currentAvatar}
        }
      });
  }
});
