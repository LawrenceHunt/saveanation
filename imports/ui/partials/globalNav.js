import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './globalNav.html';
import './globalNav.css';


Template.globalNav.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});
