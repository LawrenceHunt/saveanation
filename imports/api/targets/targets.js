import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Targets = new Mongo.Collection('targets');

// if(Meteor.isServer) {
//   // This code only runs on the server
//   // Only publish deposits that belong to the current user
//   Meteor.publish('targets', function targetsPublication() {
//     return Targets.find({
//       // Publish only the current user's targets! Bring back once User ID is in place.
//       { owner: this.userId },
//     });
//   });
// }

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('targets', function targetsPublication() {
    return Targets.find({
      $or: [
        // { private: { $ne: true } },
        { createdBy: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'targets.add'(targetAmount, targetDate){
    check(targetAmount, Number);
    check(targetDate, Date);
    // Checks user is logged in - bring back once User ID is in place.
    // if(! this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }
    Targets.insert({
      targetAmount,
      targetDate,
      createdBy: this.userId,
      createdAt: new Date(),
    });
  },
});
