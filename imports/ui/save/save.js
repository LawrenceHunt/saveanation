import { Template } from 'meteor/templating';
import { Transactions } from '../../api/transactions/transactions.js';

import './save.html';

Template.Save.onCreated(function depositOnCreated(){
  Meteor.subscribe('transactions');
});


Template.Save.helpers({
  transactions() {
    // return transactions.find({});
    return Transactions.find({}, { sort: {createdAt: -1 } });
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
  }
});
