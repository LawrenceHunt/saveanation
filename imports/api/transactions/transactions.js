import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SavingsAccounts } from '../savingsAccounts/savingsAccounts.js';

export const Transactions = new Mongo.Collection('transactions');

if(Meteor.isServer) {
  // This code only runs on the server
  // Only publish transactions that belong to the current user
  Meteor.publish('transactions', function transactionsPublication() {
    return Transactions.find({
      // Publish only the current user's transactions! Bring back once User ID is in place.
       owner: this.userId
    });
  });
}


Meteor.methods({
  'transactions.add'(amount, text, type){
    check(amount, Number);
    check(text, String);
    check(type, String);
    // Checks user is logged in - bring back once User ID is in place.
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    var currentUserId = this.userId;
    // Create the transaction object
    Transactions.insert({
      amount: amount,
      owner: currentUserId,
      text: text,
      createdAt: new Date(),
      type: type
    });
    // Adjust balance
    Meteor.call('savingsAccounts.adjustBalance', amount, currentUserId);
  }
});
