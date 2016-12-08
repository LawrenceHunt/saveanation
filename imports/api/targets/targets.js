import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Targets = new Mongo.Collection('targets');

if(Meteor.isServer) {
  Meteor.publish('targets', function targetsPublication() {
    return Targets.find({
      $or: [
        { createdBy: this.userId },
      ],
    });
  })
}

Meteor.methods({
  'targets.add'(targetAmount, targetDate){
    check(targetAmount, Number);
    check(targetDate, Date);
    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Targets.insert({
      targetAmount,
      targetDate,
      createdBy: this.userId,
      createdAt: new Date(),
    });
  },
  'targets.edit'(targetAmount, targetDate) {
    check(targetAmount, Number);
    check(targetDate, Date);
    if(! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Targets.update({createdBy: this.userId},{$set: {targetAmount:targetAmount,targetDate:targetDate}});
  },
  'targets.remove'(targetId) {
    check(targetId, String);
    const target = Targets.findOne(targetId);
    if (target.createdBy !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Targets.remove(targetId);
  }
});
