var data = require('./Reuse.js')
var obj = require('./oc.js');
var objMaps = require('./ms.js');
var objWs = require('./ws.js');


describe('maps test cases', function () {
  //1) 
  it('user login to the application', function () {

    obj.getUrl(data.url);
    obj.userName(data.userName);
    obj.password(data.password);
    obj.Login();
    expect(obj.searchBoxPresent()).toBe(true);

  });

  //2
  it("User can open the map", function () {

    objWs.clickOnLoginUserName();
    objMaps.clickOnMaps();
    expect(objMaps.checkMapsPageisOpened()).toBe(true);

  });
  //3
  it('login user can open his weather details', function () {
    objMaps.clickOnWeatherIcon();
    expect(objMaps.checkWeatherDetailsRightSidePannelIsOpened()).toEqual('Weather');

  });
  //4
  it('login user can see currently weather details', function () {
    obj.clickOnCurrentlyOption();
    expect(obj.checkweatherDetailsShowing()).toBe(true);
  });
  //5
  it('login user can see Next 24 Hours weather details', function () {
    obj.clickOnNext24HoursOption();
    expect(obj.checkweatherDetailsShowing()).toBe(true);
  });
  //6
  it('login user can see Weekly weather details', function () {

    obj.clickOnweeklyOption();
    expect(obj.checkweatherDetailsShowing()).toBe(true);
  });
  //7
  it('login user can close weather details window', function () {
    obj.clickOnRightSidePannelCloseIcon();
    expect(obj.checkRightPannelClosed()).toBe(false);
  });
  //8
  it('login user can open other user weather details window', function () {

    element(by.xpath('//*[@id="userId3"]')).click();
    browser.driver.sleep(9000);
    objMaps.clickOnWeatherIcon();
    expect(objMaps.checkWeatherDetailsRightSidePannelIsOpened()).toEqual('Weather');

  });
  //9
  it('login user can see other user currently weather details', function () {
    obj.clickOnCurrentlyOption();
    expect(obj.checkweatherDetailsShowing()).toBe(true)
  });
  //10
  it('login user can see other user Next 24 Hours weather details', function () {
    obj.clickOnNext24HoursOption();
    expect(obj.checkweatherDetailsShowing()).toBe(true);
  });
  //11
  it('login user can see other user Weekly weather details', function () {
    obj.clickOnweeklyOption();
    expect(obj.checkweatherDetailsShowing()).toBe(true);

  });
  //12
  it('login user can close other user weather details window', function () {
    obj.clickOnRightSidePannelCloseIcon();
    expect(obj.checkRightPannelClosed()).toBe(false);

  });
  //13
  it('login user can search particular location', function () {
    objMaps.clickSearchLocationIcon();
    objMaps.enterLocationClickOnEnter();
    expect(objMaps.checkSearchedLocationShowing()).toBe(true);
    objMaps.clickOnClearButton();

  });
  //14
  it('login user can search route map by useing from and to location', function () {

    objMaps.clickOnFromAndToLocationIcon();
    objMaps.enterFromLocationClickOnEnter();
    objMaps.enterToLocationClickOnEnter();
    objMaps.clickOnSearchButton();
    expect(objMaps.clickDirectionsRightSidePannelIsOpened()).toBe(true);
    obj.clickOnRightSidePannelCloseIcon();
    objMaps.clickOnClearButton();

  });
  //15
  /*   it('login user can search other user location', function() {
      browser.driver.sleep(browser.params.time);
      element(by.xpath('/html/body/aap-zapoj/app-chat-page/div/div/div/div/div/aadhya-map-page/div/div[1]/div[1]/aadhya-usersearch/div/div[2]/button')).click();
      browser.driver.sleep(browser.params.time);
        browser.actions().mouseMove(element(by.id('User')).sendKeys('adn')).perform();
       browser.driver.sleep(browser.params.time);
       browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
       browser.actions().sendKeys(protractor.Key.ENTER).perform();
       browser.driver.sleep(browser.params.long);
       expect(element(by.className('gm-style-iw-d')).isPresent()).toBe(true);
       browser.driver.sleep(browser.params.time);
             element(by.css('button[title="Clear"]')).click();
         browser.driver.sleep(browser.params.time);
 
      });
    //16
   it('login user can zoom in map', function() {
      browser.driver.sleep(browser.params.time);
      element(by.className('gm-control-active gm-fullscreen-control')).click();
      browser.driver.sleep(browser.params.time);
     expect(element(by.buttonText('Draw Search Area:')).isPresent()).toBe(true);
      
      });
//17
it('login user can zoom out map', function() {
  browser.driver.sleep(browser.params.time);
  element(by.xpath('//*[@id="map"]/div/div/button')).click();
  browser.driver.sleep(browser.params.time);
  expect(element(by.buttonText('Draw Search Area:')).isPresent()).toBe(true);
   browser.driver.sleep(browser.params.time);
 
  });
  //18
  it('login user can increase map size', function() {
    browser.driver.sleep(browser.params.time);
    element(by.css('button[title="Zoom in"]')).click();
    browser.driver.sleep(browser.params.time);
    element(by.css('button[title="Zoom in"]')).click();
    browser.driver.sleep(browser.params.time);
    });
 //19
 it('login user can decrease map size', function() {
  browser.driver.sleep(browser.params.time);
  element(by.css('button[title="Zoom out"]')).click();
  browser.driver.sleep(browser.params.time);
  element(by.css('button[title="Zoom out"]')).click();
  browser.driver.sleep(browser.params.time);
  });
  //20
  it('login user can clear the map', function() {
    browser.driver.sleep(browser.params.time);
    element(by.className('fa fa-eraser')).click();
    browser.driver.sleep(browser.params.time);
    });*/

  it("user logout the application", function () {
    obj.clickOnUserProfile();
    obj.signout();
    expect(obj.passwordTextPresent()).toBe(true);
  });


});
