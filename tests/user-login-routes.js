import { signUp, cleanDatabase, getBrowser } from './testHelpers'

// Tests not passing. We'll come back to this later.
describe("User SignUp", function () {

  beforeEach(function(){
    // server.call('logout');
    cleanDatabase();
  });

  // Just trying to get any test to pass
  describe("App title", function () {
    it("shows the correct app title", function () {
      var browserInstance = getBrowser(0);
      browserInstance.url('http://localhost:3000');
      var title = browserInstance.getTitle();
      expect(title).to.equal('Save a Nation');
    });
  });

  describe("New user", function () {
    it("allows a new user to sign up", function () {
      var browserInstance = getBrowser(0);
      browserInstance.url('http://localhost:3000');
      signUp('pikachu', 'Pikachu@pika.com', 'pikapika');
      browserInstance.waitForExist("welcome_text");
      var welcomeText = browserInstance.getText("welcome_text");
      expect(welcomeText).toEqual("Welcome pikachu");
    });
  });

  // describe("Signed out user", function () {
  //   it("redirects to home page if trying to access /character/new", function () {
  //     var browserInstance = getBrowser(0)
  //     signUp('Pikachu@pika.com', 'pikapika')
  //     browserInstance.url('http://localhost:3000/character/new')
  //     .waitForExist('div.billboard', 2000);
  //     expect(browserInstance.getUrl()).to.equal('http://localhost:3000/');
  //   });
  // });

});
