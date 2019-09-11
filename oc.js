
function sleep() {
  browser.driver.sleep(5000);
}

function Login() {
  //1
  this.getUrl = function (url) {
    browser.get(url);
    sleep();
  };

  this.userName = function (name) {
    element(by.id('Username')).sendKeys(name);
    sleep();
  };
  this.password = function (password) {
    element(by.id('Password')).sendKeys(password);
    sleep();
  };
  this.Login = function () {
    element(by.buttonText("Login")).click();
    sleep();
  };
  this.searchBoxPresent = function () {
    return $("input[id='search_key']").isPresent();
  };
  //2
  this.clickOn = function (Name) {
    sleep();
    element(by.cssContainingText('.user-name', Name)).click();
    sleep();
  }
  this.enterMessage = function (message) {
    element(by.className('custom-input')).sendKeys(message);
    sleep();
  }
  this.clickOnEnter = function () {
    element(by.css(".send-btn")).click();
    sleep();
  }
  this.getSentMessageText = function () {

    return element(by.cssContainingText('.contentjustify', 'Hi')).getText();
  }



  //3

  this.userProfilePicVisiableInChat = function () {
    sleep();

    return element(by.css('img[src="https://s3.amazonaws.com/o20190828092008798-socketfiles/userProfilePics/rakkondabala?1567590122576"]')).isPresent();

  }
  //4
  this.checkTimeStampIsPresent = function () {

    return element(by.css(".time-no-profile-pic")).isPresent();
  }
  //5

  this.uploadDocFile = function () {
    var path = require('path'),
      uploadInput = element(by.css('input[placeholder="Upload file"]'));
    fileToUpload = __dirname + "/sources/a.doc",
      absolutePath = path.resolve(__dirname, fileToUpload);
    uploadInput.sendKeys(absolutePath);
    browser.driver.sleep(8000)

  }
  this.UploadDocumentPresent = function () {

    return element(by.cssContainingText('.file-description', 'a.doc')).getText();
  }
  //6
  this.uploadImageFile = function () {
    var path = require('path'),
      uploadInput = element(by.css('input[placeholder="Upload file"]'));
    fileToUpload = __dirname + "/sources/b.png",
      absolutePath = path.resolve(__dirname, fileToUpload);
    uploadInput.sendKeys(absolutePath);
    browser.driver.sleep(8000);
  }

  this.uploadImagePresent = function () {
    return element(by.css('img[data-target="#img-popup"]')).isPresent();

  }
  //8
  
  this.mouseFocusOnFirstMessage = function () {
    /*sleep();
    browser.actions().mouseMove(element(by.css('#default'))).click().perform();
    var value1 = browser.executeScript("return $('.midContent.scrollbar').scrollTop(0);");*/
    sleep();
    element(by.cssContainingText('.contentjustify', 'Hi')).click();
    sleep();
  }
  this.clickOnMessageOptions = function () {

    element(by.css(".fa-ellipsis-v")).click();
    sleep();
  }
  this.clickOnEditMessageOption = function () {
    element(by.css("ul.rt-15 > li:nth-of-type(1) > .pointer")).click();
    sleep();
  }
  this.enterText = function (text) {
    element(by.css('textarea[ng-reflect-model="Hi"]')).sendKeys(text);
    sleep();
  }
  this.clickSaveChangesButoon = function () {
    element(by.className('fa fa-check')).click();
    sleep();
  }
  this.getEditMessagetext = function () {
    return element(by.cssContainingText('.contentjustify', 'HiEditied Message')).getText();

  }

  //9
  this.mouseFocusOnSecondMessage = function () {
    element(by.cssContainingText('.contentjustify', 'Welcome to Zapoj Application')).click();
    sleep();
  }
  this.clickOnDeleteOption = function () {
    //element(by.cssContainingText('.pointer','Delete Message')).click();
    element(by.xpath("//a[contains(text(), 'Delete Message')]")).click();
    sleep();
  }

  this.checkMessageIsDeleted = function () {

    return element(by.cssContainingText('.contentjustify', 'Welcome to Zapoj Application')).isPresent();
  }

  //10

  this.clickOnPinnedMessageOption = function () {
    element(by.linkText('  Pin Message')).click();
    sleep();
  }
  this.checkPinnedMessagePresent = function () {
    return element(by.cssContainingText('.pin-info', 'Pinned Message')).isPresent();

  }

  //11

  this.clickUserName = function () {
    element(by.className('media-heading pointer')).click();
    sleep();
  }
  this.checkUserRightSideIsOpen = function () {
    return element(by.className('fa fa-phone')).isPresent();
  }

  //12
  this.clickOnGroupsIcon = function () {
    element(by.className('fa fa-users')).click();
    sleep();
  }
  this.checkUserGroups = function () {
    return element(by.className('fa fa-users group-icon media-object fa-2x')).isPresent();

  }

  //13
  this.clickOnWeatherIcon = function () {
    element(by.className('fa fa-snowflake-o')).click();
    sleep();
  }
  this.clickOnCurrentlyOption = function () {
    element(by.buttonText('Currently')).click();
    sleep();
  }

  this.checkweatherDetailsShowing = function () {
    return element(by.css('p[class="group-name weather-summary"]')).isPresent();
  }

  //14

  this.clickOnNext24HoursOption = function () {
    element(by.buttonText('Next 24 Hours')).click();
    sleep();
  }
  //15
  this.clickOnweeklyOption = function () {
    element(by.buttonText('Weekly')).click();
    sleep();
  }
  //16

  this.clickOnSharedFilesIcon = function () {
    element(by.css('a[href="#shared_files"]')).click();
    sleep();
  }
  this.clickOnSocketFiles = function () {
    element(by.css('a[href="#socfile"]')).click();
    sleep();
  }
  this.checkSocketFilesPresent = function () {
    return element(by.linkText('a.doc')).getText();
  }

  //17

  this.clickOnPinnedMessagesOption = function () {
    element(by.css('a[title="Pinned Items"]')).click();
    sleep();
  }
  this.checkPinnedMessagesPresent = function () {
    return element(by.xpath('//*[@id="pinned"]/div[2]/ul/li/div/p')).getText();

  }
  //18
  this.clickOnRightSidePannelCloseIcon = function () {
    element(by.css('i[class="fa fa-close"]')).click();
    sleep();
  }
  this.checkRightPannelClosed = function () {
    return element(by.className('fa fa-arrows-alt')).isPresent();
  }

  //19

  this.clickOnThreadOption = function () {
    element(by.css('button[title="Thread"]')).click();
    sleep();
  }
  this.enterTextInTheReplyTextBox = function (text) {
    element(by.name("replyMessage")).sendKeys(text);
    sleep();
  }
  this.clickOnEnterButton = function () {
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    sleep();
  }
  this.getReplyMessageText = function () {
    return element(by.cssContainingText('.p-relative', 'reply message')).getText();
  }
  //20
  this.clickOnReplyThreadFirstMessage = function () {
    element(by.cssContainingText('.p-relative', 'reply message')).click();
    sleep();
  }
  this.clickOnReplyThreadEditOption = function () {
    element(by.xpath('//*[@id="sidebar"]/div[2]/div[1]/div[2]/ul/li[1]/aadhya-reply-message/div[2]/div/p[1]/span[1]/ul/li[1]/a/i')).click();
    sleep();
  }
  this.EditReplyThreadMessage = function (text) {
    element(by.css('textarea[placeholder="Type Message Here..."]')).sendKeys(text);
    sleep();

  }
  this.getReplyMessageEditedText = function () {
    return element(by.cssContainingText('.p-relative', 'reply messagenew message')).getText();

  }

  //21
  this.clickOnReplyThreadDeleteOption = function () {
    element(by.css('i[class="fa fa-trash"]')).click();
    sleep();
  }
  this.checkMessageIsDeleted = function () {
    return element(by.cssContainingText('.p-relative', 'reply messagenew message')).isPresent();
  }

  this.closeReplyThreadPannel = function () {
    element(by.css('i[class="fa fa-close"]')).click();
    sleep();
  }

  //22

  this.clickOnAttachementIcon = function () {
    element(by.className('fa  fa-paperclip ')).click();
    sleep();
  }
  this.clickOnCodeSnippetOption = function () {
    element(by.css('a[href="#file-share"]')).click();
    sleep();
  }
  this.enterSnippetTitle = function (text) {
    element(by.css('input[placeholder="Title (optional)"]')).sendKeys(text);
    sleep();
  }
  this.enterTextMessageInTheTextBox = function (text) {
    element(by.className('ace_text-input')).sendKeys(text);
  }
  this.clickOnCreateSnippetButton = function () {
    element(by.buttonText('Create Snippet')).click();
    sleep();
  }
  this.codeSnippetTextPresent = function () {
    return element(by.css('div[class="ace_line"]')).isPresent();
  }
  //23
  this.checkUrlIsPresent = function () {
    return element(by.cssContainingText('.unfurl-url', 'https://www.mrf.com')).getText();

  }

  //24
  this.clickOnEmojiOptons = function () {
   sleep();
    element(by.css("span.fa-smile-o")).click();
    browser.driver.sleep(12000);
  }
  this.selectSmileEmoji = function () {
    element(by.css("a[title='grinning face with big eyes'] .emoji")).click();
    sleep();
  }
  this.deleteEmoji=function()
  {
    element(by.css(".icon-ng2_em_smiley")).click();
    sleep();
  }
  this.checkEmojiPresent = function () {
    return element(by.css('i[title=":smiley:"]')).isPresent();
  }
  //25
  this.clickOnUnPinnedMessageOption = function () {
    element(by.css("ul.rt-15 > li:nth-of-type(4) > .pointer")).click();
    browser.driver.sleep(7000);
  }


  //26
  this.clickOnUserProfile = function () {
    element(by.className('user-info-hdr nav navbar-nav navbar-right')).click();
    sleep();
  }
  this.signout = function () {
    element(by.className('fa fa-power-off')).click();
    sleep();

  }
  this.passwordTextPresent = function () {
    return element(by.id('Password')).isPresent();
  };
  //----------------------------instant chat--------------------------------

  this.checkInstantRightSidePannelIsOpend = function () {
    return element(by.cssContainingText('.rightbar-title', 'Instant Group Profile')).getText();
  }

  this.clickOnGroupsMemberIcon = function () {
    element(by.css('a[title="Group Members"]')).click();
    sleep();
  }
  this.checkInstantGroupMembersPresent = function () {
    return element(by.css('span[title="rakkondabala"]')).getText();
  }

  this.clickOnSharedFilesIconn = function () {

    element(by.css('a[href="#files"]')).click();
    sleep();
  }

  this.clickOnInstantPinnedMessageIcon = function () {

    element(by.css('a[href="#pin-msg"]')).click();
    sleep();
  }
  this.checkInstantPinnnedIsPresent = function () {
    return element(by.xpath('//*[@id="pin-msg"]/div[2]/ul/li/div/p')).getText();

  }
  //------------------------Group chat------------------------------
  this.checkGroupRightSidePannelIsOpend = function () {
    return element(by.cssContainingText('.rightbar-title', 'Team Profile')).getText();
  }

  //--------------channel-----------------------------------------
  this.checkChannelRightSidePannelIsOpend = function () {
    return element(by.cssContainingText('.rightbar-title', 'Channel Profile')).getText();
  }


}
module.exports = new Login();