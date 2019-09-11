var data = require('./Reuse.js')
var obj = require('./oc.js');
var f = require('./fun.js');
describe('@Functionality test cases', function () {

    it("user login in to the application", function () {

        obj.getUrl(data.url);
        obj.userName(data.userName);
        obj.password(data.password);
        obj.Login();
        expect(obj.searchBoxPresent()).toBe(true);

    });
    //2

    it("when we enter @ symbol user list must highlight", function () {


        obj.clickOn(data.chatUserName);
        obj.enterMessage('@');
        expect(f.checkUsersListShowing()).toBe(true);

    });
    //4
    it("user can search for praticular user", function () {

        obj.enterMessage('jyoti');
        expect(f.checkUsersListShowing()).toBe(true);
    });
    //5
    it("user can select searched user", function () {
        f.clickOnSelectedUser();
        expect(f.userNamePresentInTheTextBox()).toContain('@jyoti taneja');

    });
    //6
    it("user can send @ message to other user", function () {
        obj.clickOnEnter();
        expect(f.getsendMessageText()).toEqual('@jyoti taneja');
    });
    //7
    it("user when we click @ message then user profile pop up will display", function () {
        f.clickOnName();
        expect(f.checkProfilePopUpIsOpened()).toBe(true);

    });
    //8
    it("login user can open the praticular user profile", function () {

        f.clickOnViewProfile();
        obj.checkUserRightSideIsOpen();
        obj.clickOnRightSidePannelCloseIcon();

    });
    //9
    it("login user can open the praticular user chat page", function () {
        f.clickOnName();
        f.clickOnDirectMessageOption();

        expect(f.checkUserChatPageIsOpened()).toContain('Jyoti Taneja');

    });
    //10


    //11
    it("login user can logout the application", function () {
        obj.clickOnUserProfile();
        obj.signout();
        expect(obj.passwordTextPresent()).toBe(true);

    });

});
