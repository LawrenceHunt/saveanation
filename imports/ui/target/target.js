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
    const today = new Date();
    const daysToSave = Date.daysBetween(today, targetDate);
    const amountPerDay = Math.round(targetAmount / daysToSave);
    console.log("To save £" + targetAmount + " by " + targetDate.toDateString()
                + ", you'll need to save £" + amountPerDay + " each day.");


    // TO DO
    // calculate number of months between now and targetDate
    // calculate number of weeks between now and targetDate

    // calculate amount needed to save per month to meet target
    // calculate amount needed to save per week to meet target

    // Output this to the screen


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
    targetId = target.name;
    console.log(targetId);
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

Date.daysBetween = function( date1, date2 ) {
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;
  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
  // Convert back to days and return
  return Math.round(difference_ms/one_day);
}
