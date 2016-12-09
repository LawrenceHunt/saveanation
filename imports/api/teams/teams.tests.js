import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
// Users?:
import { Teams } from './teams.js';

if(Meteor.isServer) {
  describe('Team', function() {
    before(function() {
      // resetDatabase();
      Accounts.createUser({username: "bill", email: "bill@bill.com", password: "asddsa"});
      // Accounts.createUser({username: "rick", email: "rick@rick.com", password: "asddsa"});
    });

    it('can create a team', function(){
      let bill = Accounts.findUserByUsername("bill")
      let userId = bill._id

      let addTeam = Meteor.server.method_handlers['team.add'];
      let teamName = "Gophers"

      let invocation = { userId };
      addTeam.apply(invocation, [teamName]);

      let ourTeam = Teams.findOne();

      expect(Teams.find().count()).to.equal(1);
      expect(ourTeam.teamName).to.equal(teamName)
      expect(ourTeam.memberIds).to.include(userId)
    });
    //not resetting database: using above team
    it('can add a team member', function(){
      let bill = Accounts.findUserByUsername("bill")
      let ourTeam = Teams.findOne();
      let userId = bill._id


      const addTeamMember = Meteor.server.method_handlers['teamMember.add'];
      const invocation = { userId };
      addTeamMember.apply(invocation, ["myfriend@friends.com"]);

      let rick = Accounts.findUserByEmail("myfriend@friends.com")
      expect(ourTeam.memberIds).to.include(rick._id)
    });
  });
}
