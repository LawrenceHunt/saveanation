export function signUp(browserName, username, email, password, firstName, lastName){
  browserName.url("localhost:3000");
  browserName.waitForExist("#signIn");
  browserName.click("#signIn")
             .click("#at-signUp")
             .setValue('#at-field-username', username)
             .setValue('#at-field-email', email)
             .setValue('#at-field-password', password)
             .setValue('#at-field-password_again', password)
             .setValue('#at-field-firstName', firstName)
             .setValue('#at-field-lastName', lastName)
             .keys("\uE006");
}

export function signIn(browserName, email, password) {
  browserName.execute(function(email, password){
    Meteor.loginWithPassword(email, password);
  }, email, password);
}

export function getBrowser(i) {
  return browser.instances[i];
}

export function signUpAndSignIn(browserName, username, email, password, firstName, lastName) {
  signUp(browserName, username, email, password, firstName, lastName);
  signIn(browserName, email, password);
}

export function cleanDatabase() {
  server.execute(function () {
    Package['xolvio:cleaner'].resetDatabase();
  });
}

export function getText(browserName, element, elementId) {
  var text = browserName.element(element);
  return text.getText(elementId);
}

export function addPost(browserName, text) {
  browserName.waitForExist('input#body-field', 2000);
  browserName.setValue('input#body-field', text);
  browserName.keys("\uE006");
  browserName.waitForExist('div.post', 2000);
}

export function createTeam(browserName, teamName) {
  browserName.waitForExist("a#team-link",2000);
  browserName.click("a#team-link");
  browserName.waitForExist("input.teamName",2000);
  browserName.setValue("input.teamName", teamName);
  browserName.click("button#new-team");
}

export function addTeamMember(browserName, userName, email) {
  browserName.waitForExist("input.memberUsername",2000);
  browserName.setValue("input.memberUsername", userName);
  browserName.setValue("input.memberEmail", email);
  browserName.click("button#add-team-member");
  browserName.waitForExist("li:nth-of-type(2)");
}

export function makeSaving(browserName, amount, text) {
  browserName.waitForExist("a#save-link",2000);
  browserName.click('a#save-link');
  browserName.waitForExist("input#amount-input", 20000);
  browserName.setValue("input#amount-input", amount);
  browserName.setValue("input#text-input", text);
  browserName.keys("\uE006");
  browserName.waitForExist('button.confirm-deposit');
  browserName.click('button.confirm-deposit');
}

export function makeMultipleSavings(browserName, amount, text) {
  browserName.waitForExist("input#amount-input", 20000);
  browserName.setValue("input#amount-input", amount);
  browserName.setValue("input#text-input", text);
  browserName.keys("\uE006");
  browserName.waitForExist('button.confirm-deposit');
  browserName.click('button.confirm-deposit');
  browserName.waitForExist("a#save-link",2000);
}

export function makeSavingBlank(browserName, amount, text) {
  browserName.waitForExist("a#save-link",2000);
  browserName.click('a#save-link');
  browserName.waitForExist("input#amount-input", 2000);
  browserName.setValue("input#amount-input", amount);
  browserName.keys("\uE006");
  browserName.waitForExist('button.confirm-deposit');
  browserName.click('button.confirm-deposit');
}
