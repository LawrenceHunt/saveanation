import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Accounts } from 'meteor/accounts-base';

export const Blocks = new Mongo.Collection('blocks');

if(Meteor.isServer) {
  Meteor.publish('blocks', function blocksPublication() {
    return Blocks.find({});
  });
}

Meteor.methods({
  'blocks.add'(blockType, xPos, yPos){
    check(blockType, String);
    check(xPos, Number);
    check(yPos, Number);
    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Blocks.insert({
      blockType,
      xPos,
      yPos,
      createdBy: this.userId,
      createdAt: new Date(),
    });
  },
});
