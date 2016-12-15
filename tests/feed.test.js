import { signUp, signIn, signUpAndSignIn, getBrowser, cleanDatabase, addPost, getText, makeSaving } from './testHelpers';

var mainBrowser;

describe('Saving Feed @watch', function () {

  beforeEach(function () {
    mainBrowser = getBrowser(0);
    cleanDatabase();
    signUpAndSignIn(mainBrowser, "Barron", "barron@trump.usa", "456789", "Barron", "Trump");
  });

  describe('Displaying activity', function() {

    it('displays saving activity', function() {
      makeSaving(mainBrowser, 10, "Because");
      expect(getText(mainBrowser,'p.post-text')).to.equal('Just saved £10: Because');
    });

    it('displays post', function(){
      addPost(mainBrowser, 'I have saved loads of money');
      expect(getText(mainBrowser,'p.post-text')).to.equal('I have saved loads of money');
    });

    it('displays username', function(){
      addPost(mainBrowser, 'I have saved loads of money');
      expect(getText(mainBrowser,'.post-author')).to.contain('Barron');
    });

  });
});
