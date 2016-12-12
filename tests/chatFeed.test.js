import { signUp, signIn, signUpAndSignIn, getBrowser, cleanDatabase, addPost, getText } from './testHelpers';

var mainBrowser

describe('Saving Feed', function () {

  beforeEach(function () {
    mainBrowser = getBrowser(0);
    mainBrowser.url('http://localhost:3000/feed');
  });

  describe('Displaying activity', function() {
    it('displays usernames and saving activity', function(){
      var update = addPost('I have saved loads of money', mainBrowser);
      expect(getText(mainBrowser)).to.equal('I have saved loads of money');
    });
  });
});
