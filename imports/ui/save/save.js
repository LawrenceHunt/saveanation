import { Template } from 'meteor/templating';
import { Transactions } from '../../api/transactions/transactions.js';
import { SavingsAccounts } from '../../api/savingsAccounts/savingsAccounts.js';

import './save.html';
import './save.css';

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
    console.log(transactions);
    return transactions;
  },
  balance() {
    var userId = Meteor.userId();
    var account = SavingsAccounts.findOne({createdBy: userId});
    if (account) {
      return account.balance.toString();
    }
  },
  noAccount() {
    var userId = Meteor.userId();
    if(SavingsAccounts.findOne({createdBy: userId}) ){
      return false;
    } else {
      return true;
    }
  },
  formatDate(dateTime) {
    return moment(dateTime).format('D MMM YYYY');
  },
  formatMoney(amount) {
    return accounting.formatMoney(amount, "£", 2, ",", ".");
  },
});

Template.Save.events({
  'submit .add-deposit'(event) {
    event.preventDefault();
    const target = event.target;
    const amount = parseInt(target.amount.value);
    const text = target.text.value;
    Meteor.call('transactions.add', amount, text, 'deposit');

    // Clear form
    target.text.value = '';
  },
  'click #createAccount'(event){
    event.preventDefault();
    Meteor.call('savingsAccounts.create');
  }
});
