import { Template } from 'meteor/templating';
import { Targets } from '../../api/targets/targets.js';

import './target.html';

Template.Target.onCreated(function targetOnCreated() {
  Meteor.subscribe('targets');
});

Template.Target.helpers({
  targets() {
    return Targets.find({});
  },
});

Template.Target.events({
  'click .calculate'(event, template) {
    event.preventDefault();
    const targetAmount = template.find('.targetAmount').value;
    const targetDate = new Date(template.find('.targetDate').value);
    console.log(targetAmount);
    console.log(targetDate);
  },
  'submit .new-target'(event) {
    event.preventDefault();
    const target = event.target;
    const targetAmount = parseInt(target.targetAmount.value);
    const targetDate = new Date(target.targetDate.value);
    Meteor.call('targets.add', targetAmount, targetDate);

    // Clear form
    target.targetAmount.value = '';
    target.targetDate.value = '';
  },
  'click .delete-target'(event) {
    const target = event.target;
    targetId = target.name
    Meteor.call('targets.remove', targetId);
  }
});

Template.EditTarget.events({
  'submit .edit-target'(event) {
    event.preventDefault();
    const target = event.target;
    const targetAmount = parseInt(target.targetAmount.value);
    const targetDate = new Date(target.targetDate.value);
    Meteor.call('targets.edit', targetAmount, targetDate);
    // route back to /target
    FlowRouter.go('target');
  }
});
