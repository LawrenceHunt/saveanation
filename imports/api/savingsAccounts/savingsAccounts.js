import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

export const SavingsAccounts = new Mongo.Collection('savingsAccounts');

if(Meteor.isServer) {
  // Only publish savingsAccounts that belong to the current user
  Meteor.publish('savingsAccounts', function transactionsPublication() {
    return SavingsAccounts.find({
      createdBy: this.userId
    });
  });
}

Meteor.methods({
  'savingsAccounts.create'(amount = 0){
    // Checks user is logged in
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    var currentUserId = this.userId;
    SavingsAccounts.insert({
      balance: amount,
      createdBy: currentUserId,
      createdAt: new Date()
    });
  },
  'savingsAccounts.adjustBalance'(amount, userId){
    SavingsAccounts.update({createdBy: userId}, {$inc: {balance: amount}});
  }
});
