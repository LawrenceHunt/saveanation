import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Teams } from '../../api/teams/teams.js';

import './team.html';

Template.Team.onCreated(function teamOnCreated() {
  Meteor.subscribe('teams');
});

Template.Team.helpers({
  teams() {
    return Teams.find({});
  },
  // team() {
  //   var userId = Meteor.userId();
  //   return Teams.findOne({createdBy: userId});
  // },
  // teamMembers() {
  //   var userId = Meteor.userId();
  //   var team = Teams.findOne({createdBy: userId});
  //   return team.memberIds;
  // }
  // returnTeamMember() {
  //
  //   return teamMember.name;
  // }

})

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
    check(memberEmail, String);
    Meteor.call('team.addMember', memberEmail);

    // Clear form
    target.memberEmail.value = '';
  },
  // 'submit #findTeamMemberForm'(event) {
  //   event.preventDefault();
  //   var userId = Meteor.userid();
  //   const email = event.target.name.value;
  //   const friend = Meteor.users.findOne({email: email});
  //   Template.Team.__helpers.get('returnTeamMember').call();
  // }
});
