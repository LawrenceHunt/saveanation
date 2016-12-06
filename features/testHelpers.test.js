export function signUp(email, password){
  server.call('user.signup', email, password);
}
export function signIn(browserName, email, password) {
  browserName.url('http://localhost:3000');
  browserName.execute(function(email, password){
    Meteor.loginWithPassword(email, password);
  }, email, password);
}

export function getBrowser(i) {
  return browser.instances[i];
}

export function signUpAndSignIn(browserName, email, password) {
  signUp(email, password);
  signIn(browserName, email, password);
}

export function cleanDatabase() {
  server.execute(function () {
    Package['xolvio:cleaner'].resetDatabase();
  });
}

export function createCharacter(browserName, characterName) {
  browserName.waitForExist(".newCharacterForm");
  browserName.setValue( '[name="name"]', characterName )
         .submitForm( '.newCharacterForm' );

}

export function getText(browserName) {
  var messageLi = browserName.element('li.message:nth-of-type(1)');
  return messageLi.getText('p.message_text');
}

export function sendText(text, browserName) {
  browserName.url('http://localhost:3000/feed');
  browserName.setValue('input#message', text);
  browserName.keys("\uE006"); //press ENTER
  browserName.waitForExist('li', 2000);
}
