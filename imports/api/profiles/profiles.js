import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = new Mongo.Collection('users');

if(Meteor.isServer) {
  // This code only runs on the server
  // Only publish savingsAccounts that belong to the current user
  Meteor.publish('users', function usersPublication() {
    return Users.find({
      // Publish only the current user's transactions! Bring back once User ID is in place.
      // { owner: this.userId }
    });
  });
}
