function sleep()
{
 browser.driver.sleep(4000);
}

function cal()
{
  //1
  this.clickOnCalendarIcon=function()
  {
    $('a[title="Calendar"]').click();
    sleep();
  }  
 this.clickOnCalendarNextMonth =function()
 {
    element(by.css('span[class="fc-icon fc-icon-right-single-arrow"]')).click();
    sleep();
 }
 this.CheckCalendarPageIsOpened=function()
 {
    return element(by.buttonText('month')).isPresent();
 }
//2

this.clickOnAnyDate=function(){
    
    element(by.css(".fc-day[data-date='2019-10-04']")).click();
    sleep();
}
this.enterEventName=function(name)
{
    element(by.name('eventName')).sendKeys(name);
    sleep();
}
this.selectSmallRoom = function()
{
   element(by.css("div.formInputcont > div:nth-of-type(2) .checkmark")).click();
   sleep();
}
this.selectStartTime=function(){
    element(by.name('startTime')).click();
    sleep();
    element(by.css('button[id="timepicker-item-id-7"]')).click();
    sleep();
    element(by.buttonText('Ok')).click();
    sleep();
}

this.selectEndTime= function()
{
    element(by.name('endTime')).click();
    sleep();
    element(by.css('button[id="timepicker-item-id-8"]')).click();
    sleep();
    element(by.buttonText('Ok')).click();
    sleep();
}

this.selectMembers=function()
{
    element(by.css("ul.topic-new-user-list > li:nth-of-type(1) .checkbox-checkmark")).click();
    sleep()
    element(by.css("ul.topic-new-user-list > li:nth-of-type(2) > .checkbox-container")).click();
    sleep();
}

this.clickOnSaveButton=function()
{
    element(by.buttonText('Save')).click();
    sleep();
}

this.checkMeetingIsCreated=function()
{
   return element(by.css(".fc-title")).getText();
    
}
this.clickOnEvent=function()
{
    element(by.css(".fc-title")).click();
    sleep();

}
this.clickOnDeleteIcon=function()

{
    element(by.css("a[title='Delete'] > .fa")).click();
    sleep();
}
this.clickOnDeleteButton=function()
{
    element(by.css("div#deletenormalmeeting .btn-primary")).click();
    
    sleep();
}

//3
this.selectRepeatTrue=function()
{
    element(by.css("div.col-sm-4 div:nth-of-type(1) > .radion-btn-conatiner")).click();
    sleep();
}
this.selectRepeatType=function(type)
{
element(by.id('repeat')).click().element(by.css('option[value='+type+']')).click();
sleep();
}

this.repeatEndsNever=function(){
    element(by.xpath("//label[contains(.,'Never')]")).click();
    sleep();
}
this.ClickOnDeleteButton=function(){
    element(by.xpath("//div[@id='deleterecurrancemeeting']//button[@class='btn btn-primary mr-15']")).click();
    sleep();
}
this.clickOnRecurenceMeetingEvent = function()
{
    element(by.css(".fc-title")).click();
    sleep();
}
//4

this.selectRepeatEndsAfterOption=function()
{
    //element(by.css(".pl-0.col-sm-12 .d-flex > .radion-btn-conatiner")).click();
    element(by.xpath("//label[contains(.,'After')]")).click();
    sleep();
}
this.enterOccurrences=function(number)
{
    element(by.css("[name='occurances']")).sendKeys(number);
    sleep();
}
//5
this.selectRepeatEndsOnOption=function()
{
    element(by.xpath("//label[contains(.,'On')]")).click();
    sleep();
}
this.deleteRecurranceMeeting=function()
{
   element(by.xpath("//b[.='All Days']")).click();
    sleep();
}

//6
this.selectWeekDays=function()
{
   
    element(by.css(".p-0.col-sm-12 label:nth-of-type(1) > b")).click();
   sleep();
   element(by.xpath("//label[5]/b[contains(.,'F')]")).click();
   sleep();
   
}
//7
this.selectMonthlyMeetingRepeatOnOrder=function()
{
   element(By.xpath("//label[contains(.,'On Date')]")).click();
   sleep();
}
this.selectMonthlyRepeatOnSelectedOrder=function()
{
    element(by.xpath("//label[contains(.,'On selected order')]")).click();
    sleep();
}

this.clickMonthlyOnOption=function()
{
    element(by.xpath('//*[@id="cal-create-event"]/div/div/form/div[1]/div[1]/div/div[3]/div[2]/div[4]/div/div[1]/label')).click();
    sleep();
}

this.selectWeekOrder=function()
{
    element(by.xpath("//sup[.='st']")).click();
    sleep();
    element(by.xpath("//b[contains(.,'3rd')]")).click();
    sleep();
}


}


module.exports = new cal();