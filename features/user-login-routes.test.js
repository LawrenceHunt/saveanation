import { signUp, signIn, getBrowser, cleanDatabase } from './testHelpers.test'

describe("User SignUp", function () {

  // beforeEach(function(){
  //   server.call('logout');
  //   cleanDatabase();
  // });

  describe("New user", function () {
    it("allows a new user to sign up", function () {
      signUp('pika', 'Pika', 'Chu', 'Pikachu@pika.com', 'pikapika')
      expect().to.equal();
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
