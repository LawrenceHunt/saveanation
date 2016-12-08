import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Teams = new Mongo.Collection('teams');

if(Meteor.isServer) {

  Meteor.publish('teams', function teamsPublication() {
    return Teams.find({
      // Publish only the current user's team! Bring back once User ID is in place.
      // { owner: this.userId }
    });
  });
}


Meteor.methods({
  'teams.add'(friend){
    check(friend, String);
    var currentUserID = this.userId;
    Teams.insert({
      members: {name: friend},
      createdBy: currentUserID,
      createdAt: new Date()
    });
  }
});
