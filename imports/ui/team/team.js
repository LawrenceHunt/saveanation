import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Teams } from '../../api/teams/teams.js';

import './team.html';


Template.Team.helpers({
  returnTeamMember() {

    return teamMember.name;
  }

})




Template.Team.events({
  'submit #findTeamMemberForm'(event) {
    event.preventDefault();
    var userId = Meteor.userid();
    const email = event.target.name.value;
    const friend = Meteor.users.findOne({email: email});
    Template.Team.__helpers.get('returnTeamMember').call();
  }
});
