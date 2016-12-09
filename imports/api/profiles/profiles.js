import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = new Mongo.Collection('users');

if(Meteor.isServer) {
  // This code only runs on the server
  // Only publish user accounts that belong to the current user
  Meteor.publish('userData', function () {
    if (this.userId) {
      return Meteor.users.find({_id: this.userId}).fetch();
      }
    });
  });
}
