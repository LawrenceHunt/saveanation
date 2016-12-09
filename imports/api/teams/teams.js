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

    var currentUserID = this.userId;
    Teams.insert({
      teamName,
      memberIds: [currentUserID],
      createdBy: currentUserID,
    });
  },
  
});
