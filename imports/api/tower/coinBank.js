import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const CoinBanks = new Mongo.Collection('coinBanks');

if(Meteor.isServer) {
  Meteor.publish('coinBanks', function coinBanksPublication() {
    return CoinBanks.find({
      owner: this.userId
    });
  });
}

Meteor.methods({
  'coinBank.create'(){
    // Checks user is logged in
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    var currentUserId = this.userId;
    CoinBanks.insert({
      balance: 5000,
      createdBy: currentUserId,
    });
  },
  'coinBank.adjustBalance'(amount, userId){
    CoinBanks.update({createdBy: userId}, {$inc: {balance: amount}});
  }
});
