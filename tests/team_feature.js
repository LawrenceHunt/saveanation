import { cleanDatabase, getBrowser, signUpAndSignIn, signUp, signIn } from './testHelpers'

describe("Team @watch", function() {
  it("can invite team members", function() {
    cleanDatabase();
    browser.url('http://localhost:3000')

    var captainBrowser = getBrowser(0);
    signUpAndSignIn(captainBrowser, "Captain", "one@hotmail.com", "asddsa");

    var friendBrowser = getBrowser(1);
    signUpAndSignIn(friendBrowser, "Friend", "two@hotmail.com", "asddsa");

    browser.waitForExist('#login-name-link')
    browser.url('http://localhost:3000/team')

    captainBrowser.waitForExist('.friend_name');
    captainBrowser.setValue( '.friend_name', "Friend" )
                  .submitForm( '#findTeamMemberForm' )
                  .waitForExist('.invite_team_member')
                  .click( '.invite_team_member');

    friendBrowser.waitForExist('.team_member_requests li:nth-of-type(1)')

    var pendingTeamMemberRequestText = friendBrowser.getText('.team_member_requests li:nth-of-type(1)')
    expect(pendingTeamMemberRequestText).to.include("Captain")

    var captainViewPendingTeamMemberRequestText = captainBrowser.getText('.team_member_requests li:nth-of-type(1)')
    expect(captainViewPendingTeamMemberRequestText).to.include("Friend")

    friendBrowser.click('Accept Team Member Request')

    browser.url('http://localhost:3000/team')

    var friendTeamView = friendBrowser.getText('.team_member_list li:nth-of-type(1)')
    expect(pendingTeamMemberRequestText).to.include("Captain")

    var captainTeamView = captainBrowser.getText('.team_member_list li:nth-of-type(1)')
    expect(captainViewPendingTeamMemberRequestText).to.include("Friend")
  });
});
