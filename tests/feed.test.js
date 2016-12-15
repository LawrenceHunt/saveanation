import { signUp, signIn, signUpAndSignIn, getBrowser, cleanDatabase, addPost, getText } from './testHelpers';

var mainBrowser;

describe('Saving Feed @watch', function () {

  beforeEach(function () {
    mainBrowser = getBrowser(0);
    cleanDatabase();
    signUpAndSignIn(mainBrowser, "Barron", "barron@trump.usa", "456789", "Barron", "Trump");
  });

  describe('Displaying activity', function() {
    it('displays usernames and saving activity', function(){
      addPost(mainBrowser, 'I have saved loads of money');
      expect(getText(mainBrowser)).to.equal('I have saved loads of money');
    });
  });
});
