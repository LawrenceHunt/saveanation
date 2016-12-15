import { cleanDatabase, getBrowser, signUpAndSignIn, getText, createTeam } from './testHelpers';

let mainBrowser;

describe("Team @watch", function() {

  beforeEach(function () {
    mainBrowser = getBrowser(0);
    cleanDatabase();
    signUpAndSignIn(mainBrowser, "Barron", "barron@trump.usa", "456789", "Barron", "Trump");
  });

  it("can create a team", function() {
    createTeam(mainBrowser, "Team Trump");
    expect(getText(mainBrowser,'div.main-area', 'h2#team-name')).to.equal("Team Trump");
  });

  it("can add a team member", function() {
    createTeam(mainBrowser, "Team Trump");
    mainBrowser.waitForExist("input.memberUsername",2000);
    mainBrowser.setValue("input.memberUsername", "Donald");
    mainBrowser.setValue("input.memberEmail", "donald@trump.com");
    mainBrowser.click("button#add-team-member");
    mainBrowser.waitForExist("li:nth-of-type(2)");
    expect(getText(mainBrowser, "div.main-area","li:nth-of-type(2)")).to.equal("Donald");
  });

  it("can edit team", function() {
    createTeam(mainBrowser, "Team Trump");
    mainBrowser.waitForExist("button.edit-team",2000);
    mainBrowser.click("button.edit-team");
    mainBrowser.waitForExist("input#new-team-name",2000);
    mainBrowser.setValue("input#new-team-name", "Team POTUS");
    mainBrowser.click("button.js-submit-new-team-name");
    expect(getText(mainBrowser,'div.main-area', 'h2#team-name')).to.equal("Team POTUS");
  });


  //
  // it("can invite team members", function() {
  //
  //
  //   var mainBrowser = getBrowser(0);
  //   signUpAndSignIn(mainBrowser, "Barron", "barron@trump.usa", "456789", "Barron", "Trump");
  //
  //   // var friendBrowser = getBrowser(1);
  //   // signUpAndSignIn(friendBrowser, "Donald", "donald@trump.usa", "789456", "Donald", "Trump");
  //
  //   browser.url('http://localhost:3000/team');
  //
  //   captainBrowser.waitForExist('.friend_name');
  //   captainBrowser.setValue( '.friend_name', "Friend" )
  //                 .submitForm( '#findTeamMemberForm' )
  //                 .waitForExist('.invite_team_member')
  //                 .click( '.invite_team_member');
  //
  //   friendBrowser.waitForExist('.team_member_requests li:nth-of-type(1)');
  //
  //   var pendingTeamMemberRequestText = friendBrowser.getText('.team_member_requests li:nth-of-type(1)');
  //   expect(pendingTeamMemberRequestText).to.include("Captain");
  //
  //   var captainViewPendingTeamMemberRequestText = captainBrowser.getText('.team_member_requests li:nth-of-type(1)');
  //   expect(captainViewPendingTeamMemberRequestText).to.include("Friend");
  //
  //   friendBrowser.click('Accept Team Member Request');
  //
  //   browser.url('http://localhost:3000/team');
  //
  //   var friendTeamView = friendBrowser.getText('.team_member_list li:nth-of-type(1)');
  //   expect(pendingTeamMemberRequestText).to.include("Barron");
  //
  //   var captainTeamView = captainBrowser.getText('.team_member_list li:nth-of-type(1)');
  //   expect(captainViewPendingTeamMemberRequestText).to.include("Donald");
  // });
});
