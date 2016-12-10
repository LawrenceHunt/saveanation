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
});

Teams.attachSchema( TeamSchema );

if(Meteor.isServer) {

  Meteor.publish('teams', function teamsPublication() {
    return Teams.find({
      $or: [
        { createdBy: this.userId },
      ],
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

    var newFriendId = Accounts.createUser({
      email: newFriendEmail,
      password: "123password456"
    });

    let currentUserId = this.userId;
    let currentTeam = Teams.findOne({ createdBy: currentUserId });

    Teams.update(
      { _id: currentTeam._id },
      { $push: { memberIds: newFriendId } }
    );
  },
});
