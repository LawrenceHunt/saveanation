import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './mainLayout.html';
import '../target/target.js';
import '../feed/feed.js';
import '../save/save.js';
import '../user/login.js';
import '../user/register.js';

Template.Dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('/');
    }
});
