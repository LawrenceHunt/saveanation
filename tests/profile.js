import { signUpAndSignIn, getBrowser, cleanDatabase, getText, makeSaving, makeSavingBlank, makeMultipleSavings } from './testHelpers';

let mainBrowser;

describe("Profile @watch", function() {

  beforeEach(function() {
    mainBrowser = getBrowser(0);
    cleanDatabase();
    signUpAndSignIn(mainBrowser, "Barron", "barron@trump.usa", "456789", "Barron", "Trump");
  });

  it("can edit username", function() {
    mainBrowser.click("a#profile-link");
    mainBrowser.waitForExist("input#username", 2000);
    mainBrowser.setValue("input#username", "Donnie");
    
  });

});
