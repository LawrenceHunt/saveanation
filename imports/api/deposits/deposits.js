import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Deposits = new Mongo.Collection('deposits');

if(Meteor.isServer) {
  // This code only runs on the server
  // Only publish deposits that belong to the current user
  Meteor.publish('deposits', function depositsPublication() {
    return Deposits.find({
      // Publish only the current user's deposits! Bring back once User ID is in place.
      // { owner: this.userId }
    })
  })

}

Meteor.methods({
  'deposits.add'(amount, text){
    check(amount, Number);
    check(text, String);

    // Checks user is logged in - bring back once User ID is in place.
    // if(! this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Deposits.insert({
      amount,
      text,
      createdAt: new Date(),
    });
  }
})
