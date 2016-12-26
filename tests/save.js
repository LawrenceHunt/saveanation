import { signUpAndSignIn, getBrowser, cleanDatabase, getText, makeSaving, makeSavingBlank, makeMultipleSavings } from './testHelpers';

let mainBrowser;

describe("Save", function() {

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

  it("awards a badge for your first saving", function() {
    makeSaving(mainBrowser, 10, "Robbed a bank");
    mainBrowser.waitForExist("input#amount-input", 2000);
    expect(getText(mainBrowser,"div.confirmation", "h2:nth-of-type(1)")).to.contain("Your first saving. I'm so proud of you!");
  });

  it("awards a badge for your second saving", function() {
    makeSaving(mainBrowser, 10, "Robbed a bank");
    makeMultipleSavings(mainBrowser, 1000, "Didn't go out");
    expect(getText(mainBrowser,"div.confirmation", "h2:nth-of-type(1)")).to.contain("On a roll! Two savings in a day!");
  });

  it("awards a badge for your third saving", function() {
    makeSaving(mainBrowser, 10, "Robbed a bank");
    makeMultipleSavings(mainBrowser, 1000, "Didn't go out");
    makeMultipleSavings(mainBrowser, 100, "Won the Euromillions");
    expect(getText(mainBrowser,"div.confirmation", "h2:nth-of-type(1)")).to.contain("My goodness! You're gonna buy this property in no time.");
  });

  it("can dismiss the badge notification", function() {
    makeSaving(mainBrowser, 15, "Shopped at Lidl");
    mainBrowser.waitForExist("input#amount-input", 2000);
    mainBrowser.click('a.dismiss');
    mainBrowser.waitForExist("input#amount-input", 2000);
    let doesNotExist = mainBrowser.waitForExist("div.confirmation", 2000, true);
    expect(doesNotExist).to.equal(true);
  });
});
