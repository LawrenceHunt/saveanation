import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

export const Teams = new Mongo.Collection('teams');

if(Meteor.isServer) {
  Meteor.publish('teams', function teamsPublication() {
    let currentUserId = this.userId;
    return Teams.find({memberIds: currentUserId});
  });

  Meteor.methods({
    'team.add'(teamName){
      check(teamName, String);

      let currentUserId = this.userId;
      let currentUser = Meteor.users.findOne(currentUserId);

      Teams.insert({
        teamName,
        memberIds: [currentUserId],
        userDetailsForDisplay: [{ email: currentUser.emails[0].address,
                                  username: currentUser.username,
                                  profile: currentUser.profile}],
        createdBy: currentUserId,
      });
    },
    'team.addMember'(newFriendEmail, newFriendUsername){
      check(newFriendEmail, String);
      check(newFriendUsername, String);
      let newFriendId = Accounts.createUser({email: newFriendEmail, username: newFriendUsername, profile: {username: newFriendUsername}});
      let newFriendUserObject = Meteor.users.findOne(newFriendId);
      // we can add the below function here to send an enrollment email:
      Accounts.sendEnrollmentEmail(newFriendUserObject, newFriendEmail);
      // more info here http://docs.meteor.com/api/passwords.html#Accounts-sendEnrollmentEmail

      let currentUserId = this.userId;
      let currentTeam = Teams.findOne({ createdBy: currentUserId });
      // could generate a random avatar with code below, or just set it as 0
      randomAvatarGenerator = Math.floor(Math.random()*7);
      Teams.update(
        { _id: currentTeam._id },
        { $push: { userDetailsForDisplay: { _id: newFriendId, username: newFriendUsername, email: newFriendEmail, profile: { avatar : randomAvatarGenerator }},
                   memberIds: newFriendId }});
    },
    'team.destroy'(teamId) {
      check(teamId, String);

      Teams.remove(teamId);
    },
    'team.removeMember'(userId) {
      check(userId, String);

      let currentUserId = this.userId;
      let currentTeam = Teams.findOne({ createdBy: currentUserId });
      let teamMembers = currentTeam.userDetailsForDisplay;

      Teams.update(currentTeam._id, {$pull: { userDetailsForDisplay: { _id: userId }}});
      Teams.update(currentTeam._id, {$pull: { memberIds: userId }});
      // still need to remove iD from array...
      // Meteor.users.findOne({ email: userEmail })
    },
    'team.updateTeamName'(newTeamName) {
      check(newTeamName, String);

      let currentUserId = this.userId;

      Teams.update({ createdBy: currentUserId }, { $set: { teamName: newTeamName }});
    },
  });
}
