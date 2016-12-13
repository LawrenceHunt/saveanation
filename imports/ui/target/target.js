import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Targets } from '../../api/targets/targets.js';
import { SavingsAccounts } from '../../api/savingsAccounts/savingsAccounts.js';
import { Transactions } from '../../api/transactions/transactions.js';
import { MomentsJS } from 'meteor/momentjs:moment';
import { Accounting } from 'meteor/lepozepo:accounting';

import './target.html';
import './target.css';

Template.Target.onCreated(function targetOnCreated() {
  this.calculation = new ReactiveDict();
  Meteor.subscribe('targets');
  Meteor.subscribe('savingsAccounts');
  Meteor.subscribe('transactions');
});

Template.Target.helpers({
  //ACTUAL SPACEBAR HELPERS FROM THE UI:
  //targets returns all Target objects
  //currentBalance returns User's current Balance
  //percentageOfTotal returns percentage of balance over targetDate
  //targetAmount returns your Target
  //targetDate returns your Target date
  // targetId returns Target id
  //targetSummary
  // all the degrees ones in the style

  targets() {
    return Targets.find({});
  },
  targetId() {
    const userId = Meteor.userId();
    const target = Targets.findOne({createdBy: userId});
    return target._id
  },
  targetDate() {
    const userId = Meteor.userId();
    const target = Targets.findOne({createdBy: userId});
    const targetDate = target.targetDate.toDateString();
    return targetDate;
  },

  targetAmount(dateOption) {
    if (dateOption == "days") {
      console.log(amountPerDay());
      return amountPerDay();
    }
    else if(dateOption == "weeks") {
      console.log(amountPerWeek());
      return amountPerWeek();
    }
    else if(dateOption == "months") {
      console.log(amountPerMonth());
      return amountPerMonth();
    }
    else {
      return targetAmount();
    }
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
    if(account()) {
      return accounting.formatMoney(currentBalance(), "£ ", 0);
    }
  },

  percentageOfTotal(balance = currentBalance(), target = targetAmount()) {
    var percentage = Math.round((balance/target) * 100);
    return percentage;
  },
  totalInDegrees() {
    var total = Template.Target.__helpers.get('percentageOfTotal').call();
    var totalInDegrees = ((total * 2.4) - 120).toString() + 'deg';
    return totalInDegrees;
  },
  degreesAbove() {
    var total = Template.Target.__helpers.get('percentageOfTotal').call();
    var degreesAbove = ((total * 2.4) - 120 + 6).toString() + 'deg';
    return degreesAbove;
  },
  degreesBelow() {
    var total = Template.Target.__helpers.get('percentageOfTotal').call();
    var degreesBelow = ((total * 2.4) - 120 - 6).toString() + 'deg';
    return degreesBelow;
  },
});

Template.Target.events({
  'click .calculate'(event, template) {
    // jobs for this event listener:
    // 1) Formatting views
    // 2) calculating still to save
    // 3) calulation amount to save per month, week, day,
    // 4) calculating targets
    // 5) setting Sessions
    event.preventDefault();
    const targetAmount = template.find('.targetAmount').value;
    var formattedTargetAmount = '£' + targetAmount.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    const userId = Meteor.userId();
    var currentBalance = SavingsAccounts.findOne({createdBy: userId}).balance;

    var stillToSave = targetAmount - currentBalance;
    var formattedStillToSave = "£" + parseInt(targetAmount - currentBalance);

    var targetDate = new Date(template.find('.targetDate').value);
    var formattedTargetDate = targetDate.toDateString();
    var targetDateMoment = moment(targetDate);
    var today = moment(new Date());
    var daysToSave = targetDateMoment.diff(today, 'days');


    var amountPerMonth = Math.round(((stillToSave / daysToSave) * 365) / 12);
    var amountPerWeek = Math.round((stillToSave / daysToSave) * 7);
    var amountPerDay = Math.round(stillToSave / daysToSave);

    var targetSummary = "You need an extra "+ formattedStillToSave + ", to save " + formattedTargetAmount + " by " + formattedTargetDate + ", you'll need to save:";
    var monthlyTarget = "£" + amountPerMonth + " each month.";
    var weeklyTarget = "£" + amountPerWeek + " each week.";
    var dailyTarget = "£" + amountPerDay + " each day.";

    template.calculation.set('stillToSave', stillToSave);
    template.calculation.set('targetSummary', targetSummary);
    template.calculation.set('monthlyTarget', monthlyTarget);
    template.calculation.set('weeklyTarget', weeklyTarget);
    template.calculation.set('dailyTarget', dailyTarget);
  },
  'change .date-range'(event) {
    event.preventDefault();
    const dateRange = event.target;
    var dateOption = dateRange.value;
    Template.Target.__helpers.get('targetAmount').call(this,dateOption);
    var transactionsTotal = transactionsValue(dateOption);
    // var targetDate = moment(Template.Target.__helpers.get('targetDate').call());
  },
  'submit .new-target'(event) {
    event.preventDefault();
    const target = event.target;
    var targetAmount = parseInt(target.targetAmount.value);
    var targetDate = new Date(target.targetDate.value);
    Meteor.call('targets.add', targetAmount, targetDate);

    // Clear form
    target.targetAmount.value = '';
    target.targetDate.value = '';
  },
  'click .delete-target'(event) {
    const target = event.target;
    var targetId = target.name;
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

Template.EditTarget.helpers({
  targetAmount() {
    return Targets.find({}).fetch()[0].targetAmount;
  },
  targetDate() {
    return Targets.find({}).fetch()[0].targetDate;
  }
});

function setPreviousDate(date,number,period) {
  var startingDate = moment(date);
  var previousDate = startingDate.subtract(number,period);
  return previousDate.toDate();
}

function transactionsInRange(dateOption) {
  const userId = Meteor.userId();
  var currentDate = new Date();
  var previousDate = setPreviousDate(currentDate,1,dateOption);
  var transactionsInRange = Transactions.find( {$and: [ {owner: userId}, {createdAt: {$lt: currentDate, $gte: previousDate} } ] } ).fetch();
  return transactionsInRange;
}

function transactionsValue(dateOption){
  var transactions = transactionsInRange(dateOption);
  var total = 0;
  for (var i = 0; i < transactions.length; i++) {
    total += transactions[i].amount;
  }
  return total;
}

function targetDate() {
  return Targets.findOne({createdBy: currentUserId()}).targetDate;
}


function stillToSave() {
  return  targetAmount() - currentBalance();
}

function daysToSave() {
  var today = moment(new Date());
  var targetDateMoment = moment(targetDate());
  return targetDateMoment.diff(today, 'days');
}

function currentBalance() {
  return account().balance;
}

function currentUserId() {
  return Meteor.userId();
}

function targetAmount() {
  return Targets.findOne({createdBy: currentUserId()}).targetAmount;
}

function account() {
  return SavingsAccounts.findOne({createdBy: currentUserId()});
}

function amountPerDay() {
  return Math.round(stillToSave() / daysToSave());
}

function amountPerWeek() {
  return Math.round((stillToSave() / daysToSave()) * 7);
}

function amountPerMonth() {
  return Math.round(((stillToSave() / daysToSave()) * 365) / 12);
}
