import { cleanDatabase, getBrowser, signUpAndSignIn, getText, createTeam, addTeamMember } from './testHelpers';

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
    addTeamMember(mainBrowser, "Donald", "donald@trump.com");
    expect(getText(mainBrowser, "div.main-area","li:nth-of-type(2)")).to.equal("Donald");
  });

  it("can edit team name", function() {
    createTeam(mainBrowser, "Team Trump");
    mainBrowser.waitForExist("button.edit-team",2000);
    mainBrowser.click("button.edit-team");
    mainBrowser.waitForExist("input#new-team-name",2000);
    mainBrowser.setValue("input#new-team-name", "Team POTUS");
    mainBrowser.click("button.js-submit-new-team-name");
    expect(getText(mainBrowser,'div.main-area', 'h2#team-name')).to.equal("Team POTUS");
  });

  it("can delete a team member", function() {
    createTeam(mainBrowser, "Team Trump");
    addTeamMember(mainBrowser, "Donald", "donald@trump.com");
    mainBrowser.click("button.edit-team");
    mainBrowser.waitForExist("li:nth-of-type(2)",2000);
    mainBrowser.click("li:nth-of-type(2) button.js-delete-team-member");
    mainBrowser.alertAccept();
    mainBrowser.waitForExist("li:nth-of-type(1)",2000);
    let doesNotExist = mainBrowser.waitForExist("ul li:nth-of-type(2) button.js-delete-team-member", 2000, true);
    expect(doesNotExist).to.equal(true);
  });

  it("can delete a team", function() {
    createTeam(mainBrowser, "Team Trump");
    mainBrowser.click("button.edit-team");
    mainBrowser.waitForExist("input#new-team-name",2000);
    mainBrowser.click("button.delete-team");
    mainBrowser.alertAccept();
    let doesExist = mainBrowser.waitForExist("input.teamName");
    expect(doesExist).to.equal(true);
  });
});
