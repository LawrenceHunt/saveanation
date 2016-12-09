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
    const userId = Random.id();
    let postId;

    it('can create a team', function(){
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
      const addTeamMember = Meteor.server.method_handlers['teamMember.add'];
      const invocation = { body: "hello", createdAt: new Date()};
      addTeamMember.apply(invocation, [postId] );
      expect(Posts.find().count()).to.equal(0);
    });
  });
}
