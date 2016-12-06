import { Template } from 'meteor/templating';
import { Deposits } from '../api/deposits.js';
import './deposit.html';
import ''

Template.body.helpers({
  deposits() {
    return Deposits.find({});
  },
});
