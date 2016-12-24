import { Meteor } from 'meteor/meteor';
import { Factory } from 'meteor/dburles:factory';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { withRenderedTemplate } from '../../test-helpers.js';
import StubCollections from 'meteor/hwillson:stub-collections';
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

  it('renders correctly with teams', function () {
    //stub the teams collection
    StubCollections.stub(Teams);
    //create the details for our team:
    const timestamp = new Date();
    teamDetails = { teamName: "Gophers",
                    memberIds: ["1111"],
                    userDetailsForDisplay: [{ email: "test@test.com",
                                              username: "test",
                                              profile: { avatar: 0 }}],
                    createdBy: "1111",
                    createdAt: timestamp
    }
    // Now Teams is stubbed to a simple local collection mock:
    Teams.insert(teamDetails);

    const data = {
      editMode() { return false },
    };

    withRenderedTemplate('Team', data, (el) => {
      console.log($(el).context.innerText)
      expect($(el).context.innerText).to.include("Your team")
      expect($(el).context.innerText).to.include("Gophers")
      expect($(el).context.innerText).to.include("Team was created on " + moment(timestamp).format("ddd Do MMM YYYY"))
    });
    // Restore the `Teams' collection
    StubCollections.restore();
  });

});
