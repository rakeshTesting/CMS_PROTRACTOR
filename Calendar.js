
     var data = require('./Reuse.js')
      var obj = require('./oc.js');
      var cal = require('./cal.js');

    describe('Calendar Test cases', function() {
        //1)
        it('user login to the application', function() {
            obj.getUrl(data.url);
            obj.userName(data.userName);
            obj.password(data.password);
            obj.Login();
            expect(obj.searchBoxPresent()).toBe(true);
        });
        //2
        
        it("login user can open the calendar",function() {

              obj.clickOn(data.groupName);
              cal.clickOnCalendarIcon();
              cal.clickOnCalendarNextMonth();
              expect(cal.CheckCalendarPageIsOpened()).toBe(true);
    
            });
    
      //-------------normal meeting----------------------------------------
          it("user can create normal meeting",function()
          
            {
              
            cal.clickOnAnyDate()
             cal.enterEventName('Test');
             cal.selectSmallRoom();
             cal.selectStartTime();
             cal.selectEndTime();
             cal.selectMembers();
             cal.clickOnSaveButton();
            expect(cal.checkMeetingIsCreated()).toContain('Test');
             cal.clickOnEvent();
            cal.clickOnDeleteIcon();
            cal.clickOnDeleteButton();
            
             
         });
        
      
    //-----------------------daily meeting---------------------------------------------------
    
        it("user can create meeting with daily repeat ends on option ",function()
            {
             
                cal.clickOnAnyDate()
                cal.enterEventName('Test');
                cal.selectSmallRoom();
               cal.selectRepeatTrue();
               cal.selectRepeatType('daily');
               cal.selectRepeatEndsOnOption();
               cal.selectStartTime();
               cal.selectEndTime();
               cal.selectMembers();
               cal.clickOnSaveButton();
               cal.clickOnRecurenceMeetingEvent();
               cal.clickOnDeleteIcon();
               cal.deleteRecurranceMeeting();
               cal.ClickOnDeleteButton();
        });
    

                 //5
              it("user can create meeting with daily recurence 5 times ",function()
                 {
                    cal.clickOnAnyDate()
                    cal.enterEventName('Test');
                    cal.selectSmallRoom();
                   cal.selectRepeatTrue();
                   cal.selectRepeatType('daily');
                   cal.selectRepeatEndsAfterOption();
                   cal.enterOccurrences(20);
                   cal.selectStartTime();
                   cal.selectEndTime();
                   cal.selectMembers();
                   cal.clickOnSaveButton();
                   cal.clickOnRecurenceMeetingEvent();
                   cal.clickOnDeleteIcon();
                   cal.deleteRecurranceMeeting();
                   cal.ClickOnDeleteButton();
    
             });
                // 7
               it("user can create meeting with daily recurence never end ",function()
                 {                 
                    cal.clickOnAnyDate()
                    cal.enterEventName('Test');
                    cal.selectSmallRoom();
                   cal.selectRepeatTrue();
                   cal.selectRepeatType('daily');
                   cal.repeatEndsNever();
                   cal.selectStartTime();
                   cal.selectEndTime();
                   cal.selectMembers();
                   cal.clickOnSaveButton();
                   cal.clickOnRecurenceMeetingEvent();
                   cal.clickOnDeleteIcon();
                   cal.deleteRecurranceMeeting();
                   cal.ClickOnDeleteButton();
      
               });
    //------------------yearly meeting-----------------------------------------------
    it("user can create meeting with yearly repeat ends on option ",function()
    {
        cal.clickOnAnyDate()
        cal.enterEventName('Test');
        cal.selectSmallRoom();
       cal.selectRepeatTrue();
       cal.selectRepeatType('yearly');
       cal.selectRepeatEndsOnOption();
       cal.selectStartTime();
       cal.selectEndTime();
       cal.selectMembers();
       cal.clickOnSaveButton();
       cal.clickOnRecurenceMeetingEvent();
       cal.clickOnDeleteIcon();
       cal.deleteRecurranceMeeting();
       cal.ClickOnDeleteButton();
    
    });
    
    
    
    it("user can create meeting with yearly recurence 5 times option ",function()
    {
     
        cal.clickOnAnyDate()
        cal.enterEventName('Test');
        cal.selectSmallRoom();
       cal.selectRepeatTrue();
       cal.selectRepeatType('yearly');
       cal.selectRepeatEndsAfterOption();
       cal.enterOccurrences(20);
       cal.selectStartTime();
       cal.selectEndTime();
       cal.selectMembers();
       cal.clickOnSaveButton();
       cal.clickOnRecurenceMeetingEvent();
       cal.clickOnDeleteIcon();
       cal.deleteRecurranceMeeting();
       cal.ClickOnDeleteButton();

    
    });
    
    
    it("user can create meeting with yearly recurence never end ",function()
                 {                 
                    cal.clickOnAnyDate()
                    cal.enterEventName('Test');
                    cal.selectSmallRoom();
                   cal.selectRepeatTrue();
                   cal.selectRepeatType('yearly');
                   cal.repeatEndsNever();
                   cal.selectStartTime();
                   cal.selectEndTime();
                   cal.selectMembers();
                   cal.clickOnSaveButton();
                   cal.clickOnRecurenceMeetingEvent();
                   cal.clickOnDeleteIcon();
                   cal.deleteRecurranceMeeting();
                   cal.ClickOnDeleteButton();
      
               });
    
    
    
    //--------------weekly meeting ------------------------------------------------------------
    
    
    it("user can create meeting with weekly repeat ends on option ",function()
    {
      cal.clickOnAnyDate()
      cal.enterEventName('Test');
      cal.selectSmallRoom();
     cal.selectRepeatTrue();
     cal.selectRepeatType('weekly');
     cal.selectWeekDays();
     cal.selectRepeatEndsOnOption();
     cal.selectStartTime();
     cal.selectEndTime();
     cal.selectMembers();
     cal.clickOnSaveButton();
     cal.clickOnRecurenceMeetingEvent();
     cal.clickOnDeleteIcon();
     cal.deleteRecurranceMeeting();
     cal.ClickOnDeleteButton();

     
    
    });
    
    
    
    it("user can create meeting with Weekly recurence 5 times option ",function()
    {
      cal.clickOnAnyDate()
      cal.enterEventName('Test');
     cal.selectSmallRoom();
     cal.selectRepeatTrue();
     cal.selectRepeatType('weekly');
     cal.selectWeekDays();
     cal.selectRepeatEndsAfterOption();
     cal.enterOccurrences(20);
     cal.selectStartTime();
     cal.selectEndTime();
     cal.selectMembers();
     cal.clickOnSaveButton();
     cal.clickOnRecurenceMeetingEvent();
     cal.clickOnDeleteIcon();
     cal.deleteRecurranceMeeting();
     cal.ClickOnDeleteButton();

    
    });
    
    it("user can create meeting with weekly recurence never end ",function()
                 {                 
              
                  cal.clickOnAnyDate()
                  cal.enterEventName('Test');
                  cal.selectSmallRoom();
                 cal.selectRepeatTrue();
                 cal.selectRepeatType('weekly');
                 cal.selectWeekDays();
                 cal.repeatEndsNever();
                 cal.selectStartTime();
                 cal.selectEndTime();
                 cal.selectMembers();
                 cal.clickOnSaveButton();
                 cal.clickOnRecurenceMeetingEvent();
                 cal.clickOnDeleteIcon();
                 cal.deleteRecurranceMeeting();
                 cal.ClickOnDeleteButton();
               });
    
    
    
    //--------------------monthy meeting-------------------------------------------
    
    
    
    it("user can create meeting with monthly (on date) repeat ends on option ",function()
    {
     
     cal.clickOnAnyDate()
     cal.enterEventName('Test');
     cal.selectSmallRoom();
     cal.selectRepeatTrue();
     cal.selectRepeatType('monthly');
     cal.selectMonthlyMeetingRepeatOnOrder();
     cal.clickMonthlyOnOption();
     cal.selectStartTime();
     cal.selectEndTime();
     cal.selectMembers();
     cal.clickOnSaveButton();
     cal.clickOnRecurenceMeetingEvent();
     cal.clickOnDeleteIcon();
     cal.deleteRecurranceMeeting();
     cal.ClickOnDeleteButton();

    });
    
    
      //5
        it("user can create meeting with monthly (on date ) recurence 5 times ",function()
         {
          cal.clickOnAnyDate()
          cal.enterEventName('Test');
         cal.selectSmallRoom();
         cal.selectRepeatTrue();
         cal.selectRepeatType('monthly');
         cal.selectMonthlyMeetingRepeatOnOrder();
         cal.selectRepeatEndsAfterOption();
         cal.enterOccurrences(20);
         cal.selectStartTime();
         cal.selectEndTime();
         cal.selectMembers();
         cal.clickOnSaveButton();
         cal.clickOnRecurenceMeetingEvent();
         cal.clickOnDeleteIcon();
         cal.deleteRecurranceMeeting();
         cal.ClickOnDeleteButton();
          
     });
        // 7
       it("user can create meeting with monthly (on date) recurence never end ",function()
         {                 
         
          cal.clickOnAnyDate()
          cal.enterEventName('Test');
          cal.selectSmallRoom();
         cal.selectRepeatTrue();
         cal.selectRepeatType('monthly');
         cal.selectMonthlyMeetingRepeatOnOrder();
         cal.repeatEndsNever();
         cal.selectStartTime();
         cal.selectEndTime();
         cal.selectMembers();
         cal.clickOnSaveButton();
         cal.clickOnRecurenceMeetingEvent();
         cal.clickOnDeleteIcon();
         cal.deleteRecurranceMeeting();
         cal.ClickOnDeleteButton();
    
       });
    
       it("user can create meeting with monthly (on selected order) repeat ends on option ",function()
    {
     
      cal.clickOnAnyDate()
      cal.enterEventName('Test');
      cal.selectSmallRoom();
     cal.selectRepeatTrue();
     cal.selectRepeatType('monthly');
     cal.selectMonthlyRepeatOnSelectedOrder();
     cal.selectWeekDays();
     cal.selectWeekOrder();
     cal.clickMonthlyOnOption();
     cal.selectStartTime();
     cal.selectEndTime();
     cal.selectMembers();
     cal.clickOnSaveButton();
     cal.clickOnRecurenceMeetingEvent();
     cal.clickOnDeleteIcon();
     cal.deleteRecurranceMeeting();
     cal.ClickOnDeleteButton();

    });
    
    
      //5
        it("user can create meeting with monthly (on selected order) recurence 5 times ",function()
         {
          cal.clickOnAnyDate()
          cal.enterEventName('Test');
         cal.selectSmallRoom();
         cal.selectRepeatTrue();
         cal.selectRepeatType('monthly');
         cal.selectMonthlyRepeatOnSelectedOrder();
         cal.selectWeekDays();
         cal.selectWeekOrder();
         cal.selectRepeatEndsAfterOption();
         cal.enterOccurrences(20);
         cal.selectStartTime();
         cal.selectEndTime();
         cal.selectMembers();
         cal.clickOnSaveButton();
         cal.clickOnRecurenceMeetingEvent();
         cal.clickOnDeleteIcon();
         cal.deleteRecurranceMeeting();
         cal.ClickOnDeleteButton();
          
     });
        // 7
       it("user can create meeting with monthly (on selected order) recurence never end ",function()
         {                 
         
          cal.clickOnAnyDate()
          cal.enterEventName('Test');
          cal.selectSmallRoom();
         cal.selectRepeatTrue();
         cal.selectRepeatType('monthly');
         cal.selectMonthlyRepeatOnSelectedOrder();
         cal.selectWeekDays();
         cal.selectWeekOrder();
         cal.repeatEndsNever();
         cal.selectStartTime();
         cal.selectEndTime();
         cal.selectMembers();
         cal.clickOnSaveButton();
       
    
       });


       it('user can delete meeting',function()
       {
        cal.clickOnRecurenceMeetingEvent();
        cal.clickOnDeleteIcon();
        cal.deleteRecurranceMeeting();
        cal.ClickOnDeleteButton();

       });
    
    
    
        //33
        it("login user can logout the application",function()
        {
            browser.driver.sleep(5000);
            obj.clickOnUserProfile();
            obj.signout();
           expect(obj.passwordTextPresent()).toBe(true);
        });
       
    });
    