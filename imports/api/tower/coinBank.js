import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

export const CoinBanks = new Mongo.Collection('coinBanks');

if(Meteor.isServer) {
  Meteor.publish('coinBanks', function coinBanksPublication() {
    return coinBanks.find({owner: this.userId});
  });
}

if(Meteor.isServer) {
  // Only publish savingsAccounts that belong to the current user
  Meteor.publish('savingsAccounts', function transactionsPublication() {
    return SavingsAccounts.find({
      // Publish only the current user's transactions! Bring back once User ID is in place.
      // { owner: this.userId }
    });
  });
}
