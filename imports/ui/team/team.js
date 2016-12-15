import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Teams } from '../../api/teams/teams.js';
import { MomentsJS } from 'meteor/momentjs:moment';
import '../account/avatarSelectTemplate.html';

import './team.html';
import './addNewTeamForm.html';
import './addTeamMemberForm.html';
import './teamMember.html';

Template.Team.onCreated(function() {
  Meteor.subscribe('teams');
  this.editMode = new ReactiveVar(false);
});

Template.registerHelper('formatDate', function(date) {
    return moment(date).format("ddd Do MMM YYYY");
});

Template.Team.helpers({
  teams() {
    return Teams.find({});
  },
  editMode: function() {
    return Template.instance().editMode.get();
  }
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
    let target = event.target;
    let memberEmail = target.memberEmail.value;
    let memberUsername = target.memberUsername.value;

    Meteor.call('team.addMember', memberEmail, memberUsername);
    currentUserId = Meteor.userId();
    // Clear form
    target.memberEmail.value = '';
    target.memberUsername.value = '';
  },
  'click .delete-team'(event) {
    event.preventDefault();

    const target = event.target;
    const teamId = target.name;
    if (confirm("Are you sure you want to delete this team?")) {
      Meteor.call('team.destroy', teamId)
    }
  },
  'click .edit-team'(event, template) {
    event.preventDefault();
    template.editMode.set(!template.editMode.get());
  },
  'click .js-delete-team-member'(event) {
    event.preventDefault();
    let target = event.target;
    let userId = target.id;
    if (confirm("Are you sure you want to remove this team member?")) {
      Meteor.call('team.removeMember', userId)
    }
  },
  'submit .js-submit-new-team-name'(event, template) {
    event.preventDefault();
    let newTeamName = event.target.newTeamName.value
    template.editMode.set(!template.editMode.get());

    Meteor.call('team.updateTeamName', newTeamName);
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
