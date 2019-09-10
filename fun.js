

function sleep()
{
 browser.driver.sleep(5000);
}

function fun1()
{

    this.checkUsersListShowing=function()
    {
       return element(by.xpath("//a[.='keerti puligadda']")).isPresent();
    }
    this.clickOnSelectedUser=function(){
        sleep();
        element(by.xpath("//a[.='keerti puligadda']")).click();
        sleep();
    }
    this.userNamePresentInTheTextBox=function()
    {
       return element(by.css(".span-at-rate")).getText();
        
    }

}

module.exports = new fun1();