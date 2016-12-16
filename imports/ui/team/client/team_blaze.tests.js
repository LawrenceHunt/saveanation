import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { withRenderedTemplate } from '../../test-helpers.js';
import '../team.js';

import { expect } from 'meteor/practicalmeteor:chai';
import { be } from 'meteor/practicalmeteor:chai';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Teams } from '../../../api/teams/teams.js';

describe('Team blaze layout', function() {
  before(function() {
    resetDatabase();
  });

  it('if no teams, it renders a team form', function () {
    const data = {};

    withRenderedTemplate('Team', data, el => {
      expect($(el).context.innerText).to.include("Create a team")
      expect($(el).context.children[0].children[2].innerHTML).to.include("Team name")
    });
  });
  // This test is not working correctly - there is a problem with rendering the data correctly...
  // it('renders correctly with teams', function () {
  //   const timestamp = new Date();
  //   teamDetails = { teamName: "Gophers",
  //                   memberIds: ["1111"],
  //                   userDetailsForDisplay: [{ email: "test@test.com",
  //                                             username: "test",
  //                                             profile: { avatar: 0 }}],
  //                   createdBy: "1111",
  //                   createdAt: timestamp
  //   }
  //   Factory.define('teams', Teams, teamDetails);
  //
  //
  //   const teamsCollection = new Mongo.Collection(null, { transform: Teams._transform });
  //   const teams = Factory.build('teams', teamDetails);
  //   teamsCollection.insert(teams);
  //
  //   const teamsCursor = teamsCollection.find();
  //   const data = {
  //     'teams.count'() { return 1 },
  //     teams() { return teams},
  //     editMode() { return false },
  //     teamName: "Gophers",
  //     memberIds: ["1111"],
  //     userDetailsForDisplay: [{ email: "test@test.com",
  //                               username: "test",
  //                               profile: { avatar: 0 }}],
  //     createdBy: "1111",
  //     createdAt: timestamp
  //   };
  //
  //   withRenderedTemplate('Team', data, (el) => {
  //     console.log(el)
  //   });
});
