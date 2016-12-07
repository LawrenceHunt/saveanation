import { getBrowser, cleanDatabase } from './testHelpers';


describe("Add deposit", function() {
  beforeEach(function(){
    cleanDatabase();
  });

  it("you can add a deposit and see it on the screen", function() {
    var mainBrowser = getBrowser(0);
    mainBrowser.url("http://localhost:3000/save");
    mainBrowser.setValue( '[name="amount"]', "15")
           .setValue( '[name="text"]', "Didn't get coffee")
           .submitForm( '.add-deposit');

    var transactions = mainBrowser.getText('#transactions');
    expect(transactions).to.include("Didn't get coffee");

  });

});
