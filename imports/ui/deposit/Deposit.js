import { Template } from 'meteor/templating';
import { Deposits } from '../../api/deposits/deposits.js';

import './deposit.html';

Template.Deposit.onCreated(function depositOnCreated(){
  Meteor.subscribe('deposits');
});

Template.Deposit.helpers({
  deposits() {
    // return Deposits.find({});
    return Deposits.find({}, { sort: {createdAt: -1 } });
  },
});

Template.Deposit.events({
  'submit .add-deposit'(event) {
    event.preventDefault();
    const target = event.target;
    const amount = parseInt(target.amount.value);
    const text = target.text.value;
    Meteor.call('deposits.add', amount, text);

    // Clear form
    target.text.value = '';
  }
});
