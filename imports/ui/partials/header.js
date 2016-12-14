import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './header.html';
// import './globalNav.css';


Template.Header.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});
