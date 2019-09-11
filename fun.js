

function sleep()
{
 browser.driver.sleep(5000);
}

function fun1()
{

    this.checkUsersListShowing=function()
    {
       return element(by.css("[src='https://s3.amazonaws.com/o20190828092008798-socketfiles/userProfilePics/jyoti?1567502848487']")).isPresent();
    }
    this.clickOnSelectedUser=function(){
        sleep();
        element(by.xpath("//a[.='jyoti taneja']")).click();
        sleep();
    }
    this.userNamePresentInTheTextBox=function()
    {
       return element(by.css(".span-at-rate")).getText();
        
    }
    //6
    this.clickOnName=function()
{
    element(by.css('span[title="@jyoti taneja"]')).click();
    sleep();
}
this.getsendMessageText=function()
{
    return  element(by.css('span[title="@jyoti taneja"]')).getText();
}
  this.checkProfilePopUpIsOpened=function()
  {
    return element(by.xpath("//a[.='View Profile']")).isPresent();
  }
//7
this.clickOnViewProfile=function()
{
    element(by.xpath("//a[.='View Profile']")).click();
    sleep();
}
//8
this.clickOnDirectMessageOption=function()
{
    element(by.linkText('Direct Message')).click();
    sleep();
}
this.checkUserChatPageIsOpened=function()
{
   return element(by.css('h4[class="media-heading pointer"]')).getText();
    
}

}

module.exports = new fun1();