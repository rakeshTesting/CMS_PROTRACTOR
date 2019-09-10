function sleep()
{
 browser.driver.sleep(5000);
}

function maps()
{
this.clickOnMaps=function()
{
    $('a[title="Navigation"]').click();
    sleep();
}
this.checkMapsPageisOpened=function()
{
 return  element(by.className('fa fa-snowflake-o')).isPresent();
}
//3
this.clickOnWeatherIcon=function()
{
    element(by.className('fa fa-snowflake-o')).click();
    sleep();
}
this.checkWeatherDetailsRightSidePannelIsOpened=function()
{
 return  element(by.cssContainingText('.rightbar-title', 'Weather')).getText();
    
}
//4
this.clickSearchLocationIcon=function()
{
    element(by.css('i[class="fa fa-map-marker"]')).click();
    sleep();
}
this.enterLocationClickOnEnter=function()
{
    browser.actions().mouseMove(element(by.id('loc')).sendKeys('khammam')).perform();
    sleep();
    browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    sleep();
}
this.checkSearchedLocationShowing=function(){

    return element(by.className('gm-style-iw-d')).isPresent();

}

//5
this.clickOnFromAndToLocationIcon=function()
{
    element(by.css('i[class="fa fa-location-arrow"]')).click();
    sleep();
}
this.enterFromLocationClickOnEnter=function()
{
    element(by.id('search_from')).sendKeys('khammam');
    sleep();
    browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    sleep();
}

this.enterToLocationClickOnEnter=function()

{
    element(by.id('search_to')).sendKeys('hyderabad');
    sleep();
    browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    sleep();
}

this.clickOnSearchButton=function(){
    element(by.buttonText('Search')).click();
    sleep();
}
this.clickDirectionsRightSidePannelIsOpened=function(){
    
  return  element(by.css('td[class="adp-text"]')).isPresent();
}


this.clickOnClearButton=function()
{
    element(by.css('button[title="Clear"]')).click();
    sleep();
}

}

module.exports = new maps();