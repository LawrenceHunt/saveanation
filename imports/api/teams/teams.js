import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

export const Teams = new Mongo.Collection('teams');

TeamSchema = new SimpleSchema({
  teamName: {
    type: String,
  },
  memberIds: {
    type: [String],
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  }
})

Teams.attachSchema( TeamSchema );

if(Meteor.isServer) {

  Meteor.publish('teams', function teamsPublication() {
    return Teams.find({
      // Publish only the current user's team! Bring back once User ID is in place.
      // { owner: this.userId }
    });
  });
}


Meteor.methods({
  'team.add'(teamName){
    check(teamName, String);

    var currentUserId = this.userId;
    Teams.insert({
      teamName,
      memberIds: [currentUserId],
      createdBy: currentUserId,
    });
  },
  'team.addMember'(newFriendEmail){
    check(newFriendEmail, String);

    console.log("newFriendEmail is: " + newFriendEmail);

    if(Accounts.createUser({ email: newFriendEmail, password: "password" })) {
      console.log("friend's account created succesfully");
    }
    else {
      console.log("friend's account not created");
    }
    let newFriend = Accounts.findUserByEmail(newFriendEmail)
    // let newFriend = Meteor.users.findOne({ email: newFriendEmail });
    // let newFriend = Meteor.users.findOne({"emails.address": newFriendEmail});

    let newFriendId = newFriend._id
    console.log("newFriend._id is " + newFriend._id);

    let currentUserId = this.userId;

    let currentTeam = Teams.findOne({ createdBy: currentUserId })
    let currentTeamId = currentTeam._id

    console.log("currentUserId is: " + currentUserId)
    console.log("currentTeam.memberIds before update is: " + currentTeam.memberIds);

    Teams.update(
      { _id: currentTeamId },
      { $push: { memberIds: newFriendId } }
    );
    console.log("currentTeam.memberIds after update is: " + currentTeam.memberIds);
  },
});

// throwError = function(error, reason, details) {
//   var meteorError = new Meteor.Error(error, reason, details);
//
//   if (Meteor.isClient) {
//     // this error is never used
//     // on the client, the return value of a stub is ignored
//     return meteorError;
//   } else if (Meteor.isServer) {
//     throw meteorError;
//   }
// };
