import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { Teams } from './teams.js';

// To do:
// Could test publications using publication-collector

if(Meteor.isServer) {
  describe('Team meteor methods in API', function() {
    before(function() {
      // resetDatabase();
      Accounts.createUser({username: "bill", email: "bill@bill.com", password: "asddsa"});
      // Accounts.createUser({username: "rick", email: "rick@rick.com", password: "asddsa"});
    });

    it('can create a team', function(){
      let bill = Accounts.findUserByUsername("bill");
      let userId = bill._id;

      let addTeam = Meteor.server.method_handlers['team.add'];
      let teamName = "Gophers";

      let invocation = { userId };
      addTeam.apply(invocation, [teamName]);

      let ourTeam = Teams.findOne();

      expect(Teams.find().count()).to.equal(1);
      expect(ourTeam.teamName).to.equal(teamName);
      expect(ourTeam.memberIds).to.include(userId);
    });
    //not resetting database: using above team
    it('can add a team member', function(){
      let bill = Accounts.findUserByUsername("bill");
      let userId = bill._id;

      const addTeamMember = Meteor.server.method_handlers['team.addMember'];
      const invocation = { userId };
      addTeamMember.apply(invocation, ["myfriend@friends.com", "rick"]);

      let rick = Accounts.findUserByEmail("myfriend@friends.com");
      let rickDisplayDetails = { _id: rick._id, username: rick.username, email: "myfriend@friends.com", profile: { avatar : 0 } };

      let ourTeamUpdated = Teams.findOne()
      expect(ourTeamUpdated.memberIds).to.include(rick._id);
      expect(ourTeamUpdated.userDetailsForDisplay).to.include(rickDisplayDetails);
    });

    it('can remove a team member', function(){
      let bill = Accounts.findUserByUsername("bill");
      let userId = bill._id;

      let rick = Accounts.findUserByUsername("rick");

      const removeTeamMember = Meteor.server.method_handlers['team.removeMember'];
      const invocation = { userId };
      removeTeamMember.apply(invocation, [rick._id]);

      let rickDisplayDetails = { _id: rick._id, username: rick.username, email: "myfriend@friends.com", profile: { avatar : 0 } };

      let ourTeamUpdated = Teams.findOne();
      expect(ourTeamUpdated.memberIds).to.not.include(rick._id);
      expect(ourTeamUpdated.userDetailsForDisplay).to.not.include(rickDisplayDetails);
    });

    it('can update the team name', function() {
      let bill = Accounts.findUserByUsername("bill");
      let userId = bill._id;
      let ourTeam = Teams.findOne();

      const updateTeamName = Meteor.server.method_handlers['team.updateTeamName'];
      const invocation = { userId };
      updateTeamName.apply(invocation, ["Ox"]);

      let ourTeamUpdated = Teams.findOne();

      expect(ourTeamUpdated.teamName).to.not.equal("Gophers");
      expect(ourTeamUpdated.teamName).to.equal("Ox");
    });

    it('can remove a team', function() {
      let bill = Accounts.findUserByUsername("bill");
      let userId = bill._id;
      let ourTeam = Teams.findOne();


      const removeTeam = Meteor.server.method_handlers['team.destroy'];
      const invocation = { userId };
      removeTeam.apply(invocation, [ourTeam._id]);

      expect(Teams.find().count()).to.equal(0);
    });
  });
}
