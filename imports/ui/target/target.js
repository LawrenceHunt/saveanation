import { Template } from 'meteor/templating';
import { Targets } from '../../api/targets/targets.js';

import './target.html';
import './body.html';

Template.Target.events({
  'submit .new-target'(event) {
    event.preventDefault();
    const target = event.target;
    const targetAmount = parseInt(target.amount.value);
    const targetDate = target.date.value;
    Meteor.call('targets.add', targetAmount, targetDate);

    // Clear form
    target.text.value = '';
  }
});
