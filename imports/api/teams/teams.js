import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


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
  'teamMember.add'(newFriendEmail){
    check(newFriendEmail, String);

    Accounts.createUser({ email: newFriendEmail });
    let newFriend = Accounts.findUserByEmail(newFriendEmail)
    let newFriendId = newFriend._id

    let currentUserId = this.userId;

    let currentTeam = Teams.findOne({ createdBy: currentUserId})
    let currentTeamId = currentTeam._id

    Teams.update({ teamName: currentTeam.teamName }, { $push: { membersIds: newFriendId } });
    console.log(currentUserId)
    console.log(newFriend)
    console.log(newFriendId)
    console.log(currentTeam)
    console.log(currentTeamId);

  }

});
