import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SavingsAccounts } from '../savingsAccounts/savingsAccounts.js';

export const Transactions = new Mongo.Collection('transactions');

if(Meteor.isServer) {
  Meteor.publish('transactions', function transactionsPublication() {
    return Transactions.find({
       owner: this.userId
    });
  });
}

Meteor.methods({
  'transactions.add'(amount, text, type){
    check(amount, validNumber);
    check(text, String);
    check(type, String);

    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    var currentUserId = this.userId;

    Transactions.insert({
      amount: amount,
      owner: currentUserId,
      text: text,
      createdAt: new Date(),
      type: type
    });

    Meteor.call('savingsAccounts.adjustBalance', amount, currentUserId);
  }
});

validNumber = Match.Where(function(num) {
   return !isNaN(parseFloat(num)) && isFinite(num) && (num !== 0);
})
