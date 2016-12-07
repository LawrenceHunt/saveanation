import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Targets } from '../api/targets/targets.js';

import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('targets');
});
