var data = require('./Reuse.js')
var obj = require('./ws.js');
describe('workspace directory', function () {

  //1
  it('user login to the application', function () {

    obj.getUrl(data.url);
    obj.userName(data.userName);
    obj.password(data.password);
    obj.Login();
    expect(obj.searchBoxPresent()).toBe(true);

  });

  //2
  it('user can open the workspace directory', function () {

    obj.clickOnLoginUserName();
    obj.clickOnWorkspaceIcon();
    expect(obj.usersPresent()).toBe(true);

  });
  //3
  it('user can search praticular employee', function () {

    obj.enterSearchUserName('kee');
    expect(obj.searchUserPresent()).toBe(false);

  });
  //4
  it('user can open searched user information', function () {

    obj.clickOnSearchedUser();
    expect(obj.displayingUserInformation()).toBe(true);

  });
  //5
  it("user logout the application", function () {
    obj.clickOnUserProfile();
    obj.signout();
    expect(obj.passwordTextPresent()).toBe(true);
  });
});

