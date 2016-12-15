import { signUpAndSignIn, getBrowser, cleanDatabase, getText, makeSaving, makeSavingBlank } from './testHelpers';

let mainBrowser;

describe("Save @watch", function() {

  beforeEach(function() {
    mainBrowser = getBrowser(0);
    cleanDatabase();
    signUpAndSignIn(mainBrowser, "Barron", "barron@trump.usa", "456789", "Barron", "Trump");
  });

  it("can make a saving", function() {
    makeSaving(mainBrowser, 10, "Didn't tip the bellboy");
    mainBrowser.waitForExist("input#amount-input", 2000);
    expect(getText(mainBrowser,"div.confirmation", "p:nth-of-type(1)")).to.contain("£10.00");
  });

});
