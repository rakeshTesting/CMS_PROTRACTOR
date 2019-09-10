  
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
this.clickOnLoginUserName= function()
{    sleep();
    element(by.id('userIdrakkondabala')).click();
    sleep();
}
this.clickOnWorkspaceIcon=function()
{
    element(by.css('a[title="Workspace Directory"]')).click();
    sleep();
}

this.usersPresent=function()
{
  return  element(by.id("search-users")).isPresent();
}
//3
 this.enterSearchUserName=function(name)
 {
    element(by.id('search-users')).sendKeys(name);
    sleep();
 }
this.searchUserPresent=function()
{
   return  element(by.css('a[title="keerti puligadda"]')).isPresent();
}

//4

this.clickOnSearchedUser = function()
{
    element(by.css('a[title="keerthi puligadda"]')).click();
    sleep();
}
this.displayingUserInformation=function()
{
    return element(by.css('svg[class="icon-fill"]')).isPresent();
    
}
    //4
   this.clickOnUserProfile = function(){
    element(by.className('user-info-hdr nav navbar-nav navbar-right')).click();
    sleep();
   }
   this.signout = function(){
    element(by.className('fa fa-power-off')).click();
    sleep();
     sleep();
     sleep();
   }
   this.passwordTextPresent = function(){
    return  element(by.id('Password')).isPresent();
   };
  console.log("new code");
}

module.exports = new Login();
