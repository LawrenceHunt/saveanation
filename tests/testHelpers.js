// export function signUp(username, email, password){
//   server.call('user.signup', username, email, password);
// =======
export function signUp(browserName, username, email, password){
  browserName.url("localhost:3000");
  browserName.waitForExist("#login-sign-in-link");
  browserName.click("#login-sign-in-link")
             .click("#signup-link")
             .setValue('#login-username', username)
             .setValue('#login-email', email)
             .setValue('#login-password', password)
             .click('#login-buttons-password');
}

export function signIn(browserName, email, password) {
  browserName.execute(function(email, password){
    Meteor.loginWithPassword(email, password);
  }, email, password);
}

export function getBrowser(i) {
  return browser.instances[i];
}

export function signUpAndSignIn(browserName, username, email, password) {
  signUp(browserName, username, email, password);
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
  var messageLi = browserName.element('li.post:nth-of-type(1)');
  return messageLi.getText('h3.post-text');
}

export function addPost(text, browserName) {
  browserName.url('http://localhost:3000/feed');
  browserName.setValue('input#body', text);
  browserName.keys("\uE006"); //press ENTER
  browserName.waitForExist('li', 2000);
}
