import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Targets } from '../../api/targets/targets.js';
import { SavingsAccounts } from '../../api/savingsAccounts/savingsAccounts.js';


import './target.html';

Template.Target.onCreated(function targetOnCreated() {
  this.calculation = new ReactiveDict();
  Meteor.subscribe('targets');
  Meteor.subscribe('savingsAccounts');
});

Template.Target.helpers({
  targets() {
    return Targets.find({});
  },
  targetSummary() {
    const instance = Template.instance();
    return instance.calculation.get('targetSummary');
  },
  dailyTarget() {
    const instance = Template.instance();
    return instance.calculation.get('dailyTarget');
  },
  weeklyTarget() {
    const instance = Template.instance();
    return instance.calculation.get('weeklyTarget');
  },
  monthlyTarget() {
    const instance = Template.instance();
    return instance.calculation.get('monthlyTarget');
  },
  currentBalance() {
    const userId = Meteor.userId();
    const account = SavingsAccounts.findOne({createdBy: userId});
    if(account) {
      return "£" + account.balance.toString();
    }
  },
  stillToSave() {
    const instance = Template.instance();
    return instance.calculation.get('stillToSave');
  }
});

Template.Target.events({
  'click .calculate'(event, template) {
    event.preventDefault();
    const targetAmount = template.find('.targetAmount').value;
    const formattedTargetAmount = '£' + targetAmount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    const userId = Meteor.userId();
    const currentBalance = SavingsAccounts.findOne({createdBy: userId}).balance;

    const stillToSave = targetAmount - currentBalance;
    const formattedStillToSave = "£" + parseInt(targetAmount - currentBalance);

    const targetDate = new Date(template.find('.targetDate').value);
    const formattedTargetDate = targetDate.toDateString();
    const today = new Date();
    const daysToSave = Date.daysBetween(today, targetDate);

    const amountPerMonth = Math.round(((stillToSave / daysToSave) * 365) / 12);
    const amountPerWeek = Math.round((stillToSave / daysToSave) * 7);
    const amountPerDay = Math.round(stillToSave / daysToSave);

    const targetSummary = "You need an extra "+ formattedStillToSave + ", to save " + formattedTargetAmount + " by " + formattedTargetDate + ", you'll need to save:";
    const monthlyTarget = "£" + amountPerMonth + " each month.";
    const weeklyTarget = "£" + amountPerWeek + " each week.";
    const dailyTarget = "£" + amountPerDay + " each day.";

    template.calculation.set('stillToSave', stillToSave);
    template.calculation.set('targetSummary', targetSummary);
    template.calculation.set('monthlyTarget', monthlyTarget);
    template.calculation.set('weeklyTarget', weeklyTarget);
    template.calculation.set('dailyTarget', dailyTarget);
  },
  'click .show-progress'(event, template) {

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
};
