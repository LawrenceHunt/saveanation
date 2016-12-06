import { signUp, signIn, signUpAndSignIn, getBrowser, cleanDatabase, sendText, getText } from './testHelpers.test';


var browser;

describe('Saving Feed', function () {

  beforeEach(function () {
    browser = getBrowser(0);
    browser.url('http://localhost:3000/feed');
  });

  it('displays usernames and saving activity', function(){
    var message = sendText('I have saved loads of money', browser);
    expect(getText(browser)).to.equal('I have saved loads of money');
  });
});
