
  var data = require('./Reuse.js')
  var obj = require('./oc.js');
  
  for(var i=0; i<=1; i++)
  {
  describe('One-to-one chat test cases', function() {
      //1) 
    
     
      it('user login to the application', function() {
      
      
        obj.getUrl(data.url);
        obj.userName(data.userName);
        obj.password(data.password);
        obj.Login();
        expect(obj.searchBoxPresent()).toBe(true);
      
     
     });
      //2
  
  
   it("login user send messages to other user",function() {
      
          if(i==0)
          {
          obj.clickOn(data.chatUserName);
          }
          if(i==1)
          {
            obj.clickOn(data.groupName);
          }
          /*obj.enterMessage('Hi');
          obj.clickOnEnter();
          obj.enterMessage('Welcome to Zapoj Application')
          obj.clickOnEnter();
           expect(obj.getSentMessageText()).toEqual('Hi');*/
           
       
        }); 
      
        //3
      /* it('View profile picture.', function() {
          
          expect(obj.userProfilePicVisiableInChat()).toBe(true);
        
          
         });


              //4
        it('Chat history with timestamps', function() {
        obj.mouseFocusOnSecondMessage();
        expect(obj.checkTimeStampIsPresent()).toBe(true);
        }); 
          
      //5)
      it('Send any type of file to other users', function() {
              
        obj.uploadDocFile();
        expect(obj.UploadDocumentPresent()).toContain('a.doc');
        
        
          }); 
         //6)
        it('Send image files to other users', function() {
       
        obj.uploadImageFile();
        expect(obj.uploadImagePresent()).toBe(true);
        
         });
            //7
        it("login user can download image/doc/video",function()
        {
            browser.driver.sleep(browser.params.time);
          element(by.xpath('//*[@id="default"]/div[2]/ul/li[4]/aadhya-chat-message/div/div/div/div/div/aadhya-file-sharing/div[3]/div/div/div[2]/div/div/ul/li/a/i')).click();
          browser.driver.sleep(browser.params.time);
         
        });
  
       //8
       it('Edit sent message.', function() {

          obj.mouseFocusOnFirstMessage()
          obj.clickOnMessageOptions();
          obj.clickOnEditMessageOption();
          obj.enterText('Editied Message');
          obj.clickSaveChangesButoon();
         expect(obj.getEditMessagetext()).toEqual('HiEditied Message');
      
  
       });
       //13
       it('Delete sent message', function() {
        obj.mouseFocusOnSecondMessage();
        obj.clickOnMessageOptions();
        obj.clickOnDeleteOption();
        expect(obj.checkMessageIsDeleted()).toBe(false);
        
        
      });
     
         //14
         it('pin a message.', function() {
          obj.mouseFocusOnFirstMessage();
          obj.clickOnMessageOptions();
          obj.clickOnPinnedMessageOption();
          expect(obj.checkPinnedMessagePresent()).toBe(true);
          
    
         });
       
       //15
       it("login user can open other member profile information",function()
      {
        obj.clickUserName();
        expect(obj.checkUserRightSideIsOpen()).toBe(true);
        
    
      });
      //16
      it("login user can see other user groups",function()
      {
        obj.clickOnGroupsIcon();
        expect(obj.checkUserGroups()).toBe(true);
        
      });
      //17
     it("login user can see other member currently weather details",function()
      {
        
        obj.clickOnWeatherIcon();
       obj.clickOnCurrentlyOption();
        expect(obj.checkweatherDetailsShowing()).toBe(true);
        
      
      });
      //18
      it("login user can see other member next 24 hours weather", function(){
        
        obj.clickOnNext24HoursOption();
        expect(obj.checkweatherDetailsShowing()).toBe(true);
        
      });
      //19
       it("login user can see other member weekly weather",function(){
        
        obj.clickOnweeklyOption();
        expect(obj.checkweatherDetailsShowing()).toBe(true);
        
      });
      //20
      it("login user can see praticular chat files like images/videos/pdf",function()
      {
        obj.clickOnSharedFilesIcon()
        obj.clickOnSocketFiles();
        expect(obj.checkSocketFilesPresent()).toEqual('a.doc');
      
      });
      //21
      it("login user can see pinned messages",function()
      {
          
          obj.clickOnPinnedMessagesOption();
          expect(obj.checkPinnedMessagesPresent()).toEqual("HiEditied Message");
          

      });
       //22
       it("login user can close other member profile information",function()
       {
         
        obj.clickOnRightSidePannelCloseIcon();
        expect(obj.checkRightPannelClosed()).toBe(false);
        
      
       })
       //23
     
        //24
        it('Add reply to amessage', function() {
          
           obj.mouseFocusOnFirstMessage();
           obj.clickOnThreadOption();
           obj.enterTextInTheReplyTextBox('reply message');
           obj.clickOnEnterButton();
           expect(obj.getReplyMessageText()).toEqual('reply message');
          
        
         });
         //25
         it('update reply to amessage', function() {
           
           obj.clickOnReplyThreadFirstMessage();
           obj.clickOnReplyThreadEditOption();
           obj.EditReplyThreadMessage('new message');
           obj.clickOnEnterButton();
           expect(obj.getReplyMessageEditedText()).toEqual('reply messagenew message');
           
           
         });
          //26
         it('delete reply to a message', function() {
          obj.clickOnReplyThreadFirstMessage();
          obj.clickOnReplyThreadDeleteOption();
           expect(obj.checkMessageIsDeleted()).toBe(false);
           obj.closeReplyThreadPannel();
           
           
        
         });
       
       //27
       it('Send code snippet.', function() {
        
        obj.clickOnAttachementIcon();
        obj.clickOnCodeSnippetOption();
        obj.enterSnippetTitle('Test');
        obj.enterTextMessageInTheTextBox('Hi');
        obj.clickOnCreateSnippetButton();
        expect(obj.codeSnippetTextPresent()).toBe(true);
      
       });
       //28
       it('Send url in one-one chat.', function() {
         
        obj.enterMessage('https://www.mrf.com')
        obj.clickOnEnter();
        expect(obj.checkUrlIsPresent()).toContain('https://www.mrf.com');
       
        
       });
       //29
       it('Add reaction to messages in chat', function() {
        
         
        obj.mouseFocusOnFirstMessage();
        obj.clickOnEmojiOptons();
         obj.selectSmileEmoji();
         expect(obj.checkEmojiPresent()).toBe(true);
         
        
       });
         //31
         it('Remove reaction to messages in chat.', function() {
          obj.deleteEmoji();
         expect(obj.checkEmojiPresent()).toBe(false);
         
         });

         it('unpin message', function() {
          
          obj.mouseFocusOnFirstMessage();
          obj.clickOnMessageOptions();
          obj.clickOnUnPinnedMessageOption();
          expect(obj.checkPinnedMessagePresent()).toBe(false);
        
        });
        //33
        it("user logout the application",function()
       {
       obj.clickOnUserProfile();
       obj.signout();
      expect(obj.passwordTextPresent()).toBe(true);
       });*/
      
      });
    
    }
    
  