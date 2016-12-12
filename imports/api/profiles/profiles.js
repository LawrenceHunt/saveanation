import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = Meteor.users;

if(Meteor.isServer) {
  // Only publish user accounts that belong to the current user
  Meteor.publish('users', function targetsPublication() {
    if (this.userId) {
      return Meteor.users.find({_id: this.userId});
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
    Meteor.users.update(this.userId, {$set: {
          username: userName,
          profile: { firstName: firstName, lastName: lastName }
        }
      });
  },
  'profiles.add'(firstName, lastName) {
    check(firstName, String);
    check(lastName, String);
    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Meteor.users.update(this.userId, {$set: {
          profile: { firstName: firstName, lastName: lastName }
        }
      });
  }
});

Users.allow({
  insert() { return true; },
  update() { return true; },
  remove() { return false; },
});
