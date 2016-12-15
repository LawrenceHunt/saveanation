import { Template } from 'meteor/templating';
import { Transactions } from '../../api/transactions/transactions.js';
import { SavingsAccounts } from '../../api/savingsAccounts/savingsAccounts.js';
import { MomentsJS } from 'meteor/momentjs:moment';
import { Accounting } from 'meteor/lepozepo:accounting';
import { Session } from 'meteor/session'
import { Posts } from '../../api/posts/posts.js';

import './save.html';
import './review.html';
import './confirmation.html';
import './save.css';

import '../badges/first_saving.html';
import '../badges/two_savings_one_day.html';

Template.Save.onCreated(function transactionsOnCreated(){
  Meteor.subscribe('transactions');
  Meteor.subscribe('savingsAccounts');
});

Template.Save.helpers({
  transactions() {
    var userId = Meteor.userId();
    return Transactions.find({owner: userId}, { sort: {createdAt: -1 } });
  },
  test() {
    var transactions = accounting.formatColumn([123.5, 3456.49, 777888.99, 12345678, -5432], "£");
    return transactions;
  },
  balance() {
    var userId = Meteor.userId();
    var account = SavingsAccounts.findOne({createdBy: userId});
    if (account) {
      return account.balance.toString();
    }
  },
  formatDate(dateTime) {
    return moment(dateTime).format('D MMM YYYY');
  },
  formatMoney(amount) {
    return accounting.formatMoney(amount, "£", 2, ",", ".");
  },
  savingAmount() {
    return Session.get('amount');
  },
  savingText() {
    return Session.get('text');
  },
  showConfirmMessage() {
    return Session.get('showConfirmMessage');
  }
});

Template.Save.events({
  'submit .add-deposit'(event) {
    event.preventDefault();
    const target = event.target;
    Session.set('amount', parseFloat(target.amount.value));
    Session.set('text', target.text.value);
    BlazeLayout.render("mainLayout", {content: 'ReviewSaving'});
  },
  'click .visit-tower'(event) {
    clearSessionVars();
  },
  'click .dismiss'(event) {
    clearSessionVars();
  }
});

function noAccount() {
  var userId = Meteor.userId();
  if(SavingsAccounts.findOne({createdBy: userId}) ){
    return false;
  } else {
    return true;
  }
}

function clearSessionVars() {
  Session.set('amount', undefined);
  Session.set('text', undefined);
  Session.set('showConfirmMessage', false);
  Session.set('coinsAwarded', undefined);
}

Template.ReviewSaving.helpers({
  savingAmount() {
    var amount = Session.get('amount');
    return accounting.formatMoney(amount, "£", 2, ",", ".");
  },
  savingText() {
    return Session.get('text');
  }
});

Template.ReviewSaving.events({
  'click .confirm-deposit'(event) {
    if (noAccount()) {
      Meteor.call('savingsAccounts.create');
    }
    let amount = Session.get('amount');
    let text = Session.get('text');
    Meteor.call('transactions.add', amount, text, 'deposit');
    Meteor.call('post.add', "Just saved " + accounting.formatMoney(amount, '£', 0) + ": " + (text? text: "They didn't say why?!"), Meteor.myFunctions.encouragement());
    Session.set('showConfirmMessage', true);
    Session.set('coinsAwarded', parseInt(amount)*10);

    var userId = Meteor.userId();
    Session.set('transactionsCount', Transactions.find({owner: userId}).count());
    BlazeLayout.render("mainLayout", {content: 'Save'});
  },
  'click .reject-deposit'(event) {
    BlazeLayout.render("mainLayout", {content: 'Save'});
  },

});

Template.ConfirmationMessage.helpers({
  savingAmount() {
    var amount = Session.get('amount');
    return accounting.formatMoney(amount, "£", 2, ",", ".");
  },
  coinsAwarded() {
    return Session.get('coinsAwarded');
  },
  firstSaving() {
    if(Session.get('transactionsCount') == 10) {
      return true;
    }
  },
  secondSaving() {
    if(Session.get('transactionsCount') == 11) {
      return true;
    }
  }
});
