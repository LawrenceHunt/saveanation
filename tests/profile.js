import { signUpAndSignIn, getBrowser, cleanDatabase, getText, makeSaving, makeSavingBlank, makeMultipleSavings } from './testHelpers';

let mainBrowser;

describe("Profile", function() {

  beforeEach(function() {
    mainBrowser = getBrowser(0);
    cleanDatabase();
    signUpAndSignIn(mainBrowser, "Barron", "barron@trump.usa", "456789", "Barron", "Trump");
  });

  it("can edit username", function() {
    mainBrowser.waitForExist("a#save-link",2000);
    mainBrowser.click("a#profile-link");
    mainBrowser.waitForExist("a#save-link",2000);
    mainBrowser.click("i#edit-profile");
    mainBrowser.waitForExist("a#save-link",2000);
    mainBrowser.setValue("form.edit-profile input#username", "Donnie");
    mainBrowser.click("button#update-button");
    mainBrowser.waitForExist("i#edit-id", 2000);
    expect(getText(mainBrowser,"div.main-area", "p:nth-of-type(1)")).to.contain("Donnie");
  });

});
