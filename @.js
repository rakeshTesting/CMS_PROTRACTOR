      var data = require('./Reuse.js')
     var obj = require('./oc.js');  
     var f=require('./fun.js');
    describe('@Functionality test cases', function() {

        it("user login in to the application",function(){
        
        obj.getUrl(data.url);
        obj.userName(data.userName);
        obj.password(data.password);
        obj.Login();
        expect(obj.searchBoxPresent()).toBe(true);

        });
        //2
        
          it("when we enter @ symbol user list must highlight",function(){

           
          obj.clickOn(data.chatUserName);
           obj.enterMessage('@');
           expect(f.checkUsersListShowing()).toBe(true);
          
            });
            //4
            it("user can search for praticular user",function(){
             
             obj.enterMessage('Keerth');
             expect(f.checkUsersListShowing()).toBe(true);
            });
            //5
            it("user can select searched user",function(){
                f.clickOnSelectedUser();
            expect(f.userNamePresentInTheTextBox()).toContain('@Keerthi Puligadda');
            
             });
                //6
                it("user can send @ message to other user",function(){
                    obj.clickOnEnter();
                    expect(obj.getSentMessageText()).toEqual('@Keerthi Puligadda');
                  });
                  //7
                  it("user when we click @ message then user profile pop up will display",function(){
                    browser.driver.sleep(browser.params.long);
                    element(by.xpath('//*[@id="default"]/div[2]/ul/li/aadhya-chat-message/div/div/div/div[2]/p/aadhya-text-message/span/span/span')).click();
                    browser.driver.sleep(browser.params.time);
                   expect(element(by.linkText('View Profile')).isPresent()).toBe(true);
                   browser.driver.sleep(browser.params.time);
                    });
                    //8
                    it("login user can open the praticular user profile",function(){
                      browser.driver.sleep(browser.params.time);
                      element(by.xpath('//*[@id="Messages"]/div/aadhya-profile-popup/div[1]/div[2]/ul/li[1]/a')).click();
                      browser.driver.sleep(browser.params.long);
                     expect(element(by.xpath('//*[@id="sidebar"]/div[2]/div[1]/p')).isPresent()).toBe(true);
                     browser.driver.sleep(browser.params.time);
                     element(by.css('i[class="fa fa-close"]')).click();
                     browser.driver.sleep(browser.params.time);
                      });
                      //9
                      it("login user can open the praticular user chat page",function(){
                        browser.driver.sleep(browser.params.time);
                        element(by.xpath('//*[@id="default"]/div[2]/ul/li/aadhya-chat-message/div/div/div/div[2]/p/aadhya-text-message/span/span/span')).click();
                        browser.driver.sleep(browser.params.time);
                        element(by.linkText('Direct Message')).click();
                        browser.driver.sleep(browser.params.time);
                       expect(element(by.css('h4[class="media-heading pointer"]')).getText()).toBe('Adnan Sami');
                       browser.driver.sleep(browser.params.time);
                        });
                        //10
                     
                          it("deleteing @ messages",function(){
                          browser.driver.sleep(browser.params.time);
                          element(by.xpath('//*[@id="userId3"]')).click();
                           browser.driver.sleep(browser.params.long);
                        browser.actions().mouseMove(element(by.css('span[class="at-rate valid-user"]'))).perform();
                        browser.driver.sleep(browser.params.time);
                        element(by.className('fa fa-ellipsis-v')).click();
                        browser.driver.sleep(browser.params.time);
                        element(by.linkText('  Delete Message')).click();
  
                        browser.driver.sleep(browser.params.time);
                        expect(element(by.css('span[class="at-rate valid-user"]')).isPresent()).toBe(false)
              
                         });
        //11
        it("login user can logout the application",function()
        {
            obj.clickOnUserProfile();
            obj.signout();
            expect(obj.passwordTextPresent()).toBe(true);
    
        });
       
    });
  