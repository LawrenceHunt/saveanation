import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Teams } from '../../api/teams/teams.js';

import './team.html';
import './addNewTeamForm.html';
import './addTeamMemberForm.html';
import './teamMember.html';

Template.Team.onCreated(function() {
  Meteor.subscribe('teams');
  Meteor.subscribe('userDirectory', Session.get('randomValue'));
});

Template.Team.helpers({
  teams() {
    return Teams.find({});
  },
  teamMemberObject(memberIds) {
    //find current user and team
    let currentUserId = Meteor.userId();
    let currentTeam = Teams.findOne({memberIds: currentUserId});
    currentTeamMembers = currentTeam.memberIds;
    //return all team members
    console.log(Meteor.users.find({_id: {$in: currentTeamMembers}}).fetch());
    return Meteor.users.find({_id: {$in: currentTeamMembers}});
    //just another way of doing the above, not using memberIds passed through at template level:
    // return memberIds.map(function(memberId){
    //   return Meteor.users.findOne(memberId);
    // })
  },
});



Template.Team.events({
  'submit .new-team'(event) {
    event.preventDefault();
    const target = event.target;
    const teamName = target.teamName.value;
    Meteor.call('team.add', teamName);

    // Clear form
    target.teamName.value = '';
  },
  'submit .new-team-member'(event) {
    event.preventDefault();
    const target = event.target;
    const memberEmail = target.memberEmail.value;

    Meteor.call('team.addMember', memberEmail);
    // Clear form
    target.memberEmail.value = '';
  },
});

// This is a function to allow you to console.log things client side from spacebar functions
// Usage example: {{ log(this)}}
// MB
Template.registerHelper('log', function(what) {
  // You can use `this` and/or `Template.instance()`
  // to get template data access
  console.log(what);
});
