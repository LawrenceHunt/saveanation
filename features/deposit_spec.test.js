import { signUp, signIn, getBrowser, cleanDatabase } from './testHelpers.test';

describe("Add deposit", function() {
  it("you can add a deposit and see it on the screen", function() {
    browser.url("http://localhost:3000/");
    var mainBrowser = browser.instances[0];

    var saveButtonText = mainBrowser.getText('#savings_button');

    expect(saveButtonText).to.equal("Save");

    browser.click('#savings_button')
           .waitForExist("#newDepositForm");

    var newDepositFormText = browser.getText('form input:nth-of-type(1)');

    expect(newDepositFormText).to.equal("How much are you going to save?");

    browser.setValue( '[name="deposit_amount"]', "15")
           .setValue( '[name="deposit_reason"]', "Didn't get coffee")
           .submitForm( '#newDepositForm');

    var savingsScreenText = browser.getText('#total_savings');

    expect(savingsScreenText).to.equal("£15.00");

  });

});
