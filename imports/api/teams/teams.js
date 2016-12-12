import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

export const Teams = new Mongo.Collection('teams');

TeamSchema = new SimpleSchema({
  teamName: {
    type: String,
  },
  members: {
    type: [Object],
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
});

Teams.attachSchema( TeamSchema );

if(Meteor.isServer) {

  Meteor.publish('teams', function teamsPublication() {
    var user = Meteor.users.findOne(this.userId);
    return Teams.find({members: user});
  });

  // Meteor.publish("userDirectory", function () {
  //   //getting details of current user's team
  //   let currentUserId = this.userId;
  //   let currentTeam = Teams.findOne({ createdBy: currentUserId });
  //   // get a list of all current team members
  //   let ids = currentTeam.members;
  //   //return only users that belong to this team
  //   return Meteor.users.find({_id: {$in: ids}});
  //   //this will need to be changed to return only the pertinent fields for security purposes (eg username, email)
  // });

  Meteor.methods({
    'team.add'(teamName){
      check(teamName, String);

      let currentUser = Meteor.user();
      console.log(currentUser);
      Teams.insert({
        teamName,
        members: [currentUser],
        createdBy: currentUser._id,
      });
      console.log(Teams.findOne({teamName: teamName}));
    },
    'team.addMember'(newFriendEmail){
      check(newFriendEmail, String);
      let newFriendId = Accounts.createUser({email: newFriendEmail, username: newFriendEmail});
      let newFriend = Meteor.users.find(newFriendId);
      console.log(newFriend);
      // we can add the below function here to send an enrollment email:
      // Accounts.sendEnrollmentEmail(newFriendId)
      // more info here http://docs.meteor.com/api/passwords.html#Accounts-sendEnrollmentEmail

      let currentUserId = this.userId;
      let currentTeam = Teams.findOne({ createdBy: currentUserId });

      Teams.update(
        { _id: currentTeam._id },
        { $push: { members: newFriend } }
      );
    },
  });
}
