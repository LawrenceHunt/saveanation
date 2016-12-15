// import { Meteor } from 'meteor/meteor';
// import { Mongo } from 'meteor/mongo';
// import { check } from 'meteor/check';

// export const Badges = new Mongo.Collection('badges');
//
// if(Meteor.isServer) {
//   Meteor.publish('badges', function badgesPublication() {
//     return Badges.find({
//       $or: [
//         { createdBy: this.userId },
//       ],
//     });
//   });
// }

// Meteor.methods({
//   'badges.add'(type, text, image_url, users_awarded_this_badge){
//     check(type, String);
//     check(text, String);
//     check(image_url, String)
//     if(! this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
//     Targets.insert({
//       targetAmount,
//       targetDate,
//       createdBy: this.userId,
//       createdAt: new Date(),
//     });
//   },
//   'targets.edit'(targetAmount, targetDate) {
//     check(targetAmount, Number);
//     check(targetDate, Date);
//     console.log(Targets);
//     if(! this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
//     Targets.update({createdBy: this.userId},{$set: {targetAmount:targetAmount,targetDate:targetDate}});
//   },
//   'targets.remove'(targetId) {
//     check(targetId, String);
//     const target = Targets.findOne(targetId);
//     if (target.createdBy !== this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
//     Targets.remove(targetId);
//   }
// });
