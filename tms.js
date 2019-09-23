  
  function sleep()
  {
   browser.driver.sleep(5000);
  }
  
  function Login()
{
    //1
    this.getUrl=function(url)
    {
    browser.get(url);
    sleep();
    };
 
    this.userName = function(name){
    element(by.id('Username')).sendKeys(name);
    sleep();
    };
    this.password = function(password){
    element(by.id('Password')).sendKeys(password);
    sleep();
    };
    this.Login = function(){
    element(by.buttonText("Login")).click();
    sleep();
    };
    this.searchBoxPresent = function(){
    return $("input[id='search_key']").isPresent();
    };
//2

    this.themeColorSkyBluePresent= function()
    {
       return element(by.css(".leftBar")).getCssValue('background-color');
    }
    //3

    this.clickSettingIcon = function(){
        $('a[title="Setting"]').click();
        sleep();
        
    }
    this.clickOnThemsOption= function()
    {
        $('a[href="#theme"]').click();
        sleep();
    }

    this.themsListpresent = function()
    {
       return element(by.buttonText('Save')).isPresent();
    }

    //4

    this.clickOnTheme1= function()
    {
       element(by.css('label[for="defualt-blue"]')).click();
       sleep();
    };
   this.layoutChangedTheme= function()
   {
    return element(by.css(".leftBar")).getCssValue('background-color');
   };
    //5
    this.clickOnTheme2=function()
    {
        element(by.css('label[for="black"]')).click();
        sleep();
    };
   //6
   this.clickOnTheme3 = function()
   {
    element(by.css('label[for="orange"]')).click();
    sleep();
   }
   //7
   this.clickOnTheme4 = function()
   {
    element(by.css('label[for="purple"]')).click();
    sleep();
   }
   //8
   this.clickOnTheme5 = function()
   {
    element(by.css('label[for="navy-blue"]')).click();
    sleep();
   }
   //9
   this.clickOnTheme6 = function()
   {
    element(by.css('label[for="red"]')).click();
    sleep();
   }
   //10
   this.clickOnTheme7 = function()
   {
    element(by.css('label[for="sky-blue"]')).click();
    sleep();
   }
   //11

   this.clickDefaultTheme = function()
   {
    element(by.css('label[for="default-theme"]')).click();
    sleep();
   }
   this.clickOnSaveButton = function()
   {
        
    element(by.buttonText('Save theme')).click();
    browser.driver.sleep(9000);
   }
  //12
    //4
   this.clickOnUserProfile = function(){
    element(by.className('user-info-hdr nav navbar-nav navbar-right')).click();
    sleep();
   }
   this.signout = function(){
    element(by.className('fa fa-power-off')).click();
    sleep();

   }
   this.passwordTextPresent = function(){
    return  element(by.id('Password')).isPresent();
   };
  
}

module.exports = new Login();