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
    var block = Blocks.insert({
      blockType,
      xPos,
      yPos,
      createdBy: this.userId,
      createdAt: new Date(),
    });
    return block;
  },
  'blocks.edit'(blockId, blockType, xPos, yPos) {
    check(blockId, String);
    check(blockType, String);
    check(xPos, Number);
    check(yPos, Number);
    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Blocks.update(
      { _id: blockId },
      { $set:
        {
          blockType:blockType,
          xPos:xPos,
          yPos:yPos
        }
      }
    );
  },
});
