
     var data = require('./Reuse.js')
     var obj = require('./oc.js');
     var file=require('./file.js')
     
    describe('Group secure file sharing', function() {
        //1) 
        it("user can login to the application",function(){
            obj.getUrl(data.url);
            obj.userName(data.userName);
            obj.password(data.password);
            obj.Login();
            expect(obj.searchBoxPresent()).toBe(true);
        });
        //2
        it("user can open the file shareing option ",function(){
          
            obj.clickOn(data.groupName);
            file.clickOnFileShareOption();
            expect(file.checkGroupSecureFileSharePageIsOpened()).toBe(true)

        });
        //3
        it("user can create the folder",function() {

           file.clickOnNewOption();
           file.clickOnFolderOption();
           file.enterFolderName('Z');
           file.clcikOnCreateButton();
           file.clickOnNewOption();
           file.clickOnFolderOption();
           file.enterFolderName('Z1');
           file.clcikOnCreateButton();
          expect(file.checkFolderIsCreated()).toContain('Z');
       

        })
    
        //4
      
        
        it('user can upload image files',function(){
          file.clickOnNewOption();
          file.clickOnFileOption();
          file.uploadTheFile('/sources/b.png');
          file.clickOnFileUploadButton();
          expect(file.checkImageFileIsUploaded()).toContain('b.png')
         
        });
        //5
        it('user can upload doc files',function(){
          file.clickOnNewOption();
          file.clickOnFileOption();
          file.uploadTheFile('/sources/a.doc');
          file.clickOnFileUploadButton();
          expect(file.checkDocFileIsUploaded()).toContain('a.doc');
          
        });
        //6
        it('user can upload video files',function(){

          file.clickOnNewOption();
          file.clickOnFileOption();
          file.uploadTheFile('/sources/c.flv');
          file.clickOnFileUploadButton();
          expect(file.checkVideoFileIsUploaded()).toContain('c.flv');
        
        });
        //7
        it('user can upload xl files',function(){
          
          file.clickOnNewOption();
          file.clickOnFileOption();
          file.uploadTheFile('/sources/d.xlsx');
          file.clickOnFileUploadButton();
          expect(file.checkXlsxIsUpLoaded()).toContain('d.xlsx');
        });
       
        //8
        it('user can upload pdf files',function(){
          
          file.clickOnNewOption();
          file.clickOnFileOption();
          file.uploadTheFile('/sources/e.pdf');
          file.clickOnFileUploadButton();
          expect(file.checkPdfFileIsUploaded()).toContain('e.pdf');
        });
        //9
       it('user can rename the filename',function(){
        
          file.clickOnFileOptions();
          file.clickOnRenameOption();
          file.enterRename('aa.doc')
          file.clickOnSaveButton();
          expect(file.checkFileRenamedSuccessfully()).toContain('aa.doc');
  
    
        });
        //10
        it('user can preview the file',function(){
          
          file.clickOnFileOptions();
          file.clickOnFilePreviewOption();
         expect(file.checkFilePreviewIsOpened()).toBe(true);
          file.closePreviewRightSidePannel();
        });
     
         //11
         it('user can download the file',function(){
              
          file.clickOnFileOptions();
          file.clickOnDownloadOption();
        });

        it('user can copy the file',function(){

         file.clickOnFileOptions();
         file.clickOnOption('Copy');
         file.selectFolder();
         file.clickOnButton('Copy');
        
        
        });

        //12
        it('user can move the file',function(){

          file.clickOnFileOptions();
         file.clickOnOption('Move');
         file.selectFolder();
         file.clickOnButton('Move');
        
    
        });
        //13
      
        //14
       /* it('user can share the file',function(){
          element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[3]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/div/div[1]/a/i')).click();
          browser.driver.sleep(browser.params.time);
          element(by.linkText('Share')).click();
          browser.driver.sleep(browser.params.time);
         element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[3]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/aadhya-dynamic-modal[2]/div/div/div[2]/div/div/div[1]/div[3]/input')).sendKeys('jam')
          browser.driver.sleep(browser.params.time);
          element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[3]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/aadhya-dynamic-modal[2]/div/div/div[2]/div/div/div[1]/div[4]/div[1]/ul/li/label')).click();
          browser.driver.sleep(browser.params.time);
          element(by.buttonText('Share')).click();
          browser.driver.sleep(browser.params.long);
        });
       //15
        it('user can delete the file',function(){
          element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[3]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/div/div[1]/a/i')).click();
          browser.driver.sleep(browser.params.time);
          element(by.linkText('Delete')).click();
          browser.driver.sleep(browser.params.time);
          let ale=browser.switchTo().alert();
          browser.driver.sleep(5000);
          ale.accept();
        browser.driver.sleep(15000);
        expect(element(by.css('a[title="b.png"]')).isPresent()).toBe(true);
        browser.driver.sleep(browser.params.time);
        });*/
    
    //---------------------------------file------------------------------------------------
       //16
       /* it('user can rename the folder name',function(){
          browser.driver.sleep(browser.params.time);
          element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/div/div[1]/a/i')).click();
          browser.driver.sleep(browser.params.time);
          element(by.linkText('Rename')).click();
          browser.driver.sleep(browser.params.time);
          element(by.name('newName')).clear();
          browser.driver.sleep(browser.params.time);
          element(by.name('newName')).sendKeys('z3');
          browser.driver.sleep(browser.params.time);
          element(by.buttonText('Save')).click();
          browser.driver.sleep(browser.params.time);
          expect(element(by.css('a[title="z1"]')).isPresent()).toBe('z1');
          browser.driver.sleep(browser.params.time);
    
    
    
        });*/
      
        //17
       /* it('user can share folder to other members ',function(){
          
          browser.driver.sleep(browser.params.time);
          element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/div/div[1]/a/i')).click();
          browser.driver.sleep(browser.params.time);
          element(by.linkText('Share')).click();
          browser.driver.sleep(browser.params.time);
          element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/aadhya-dynamic-modal[2]/div/div/div[2]/div[2]/div[2]/div[1]/input')).sendKeys('nag');
          browser.driver.sleep(browser.params.time);
          element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/aadhya-dynamic-modal[2]/div/div/div[2]/div[2]/div[2]/div[2]/div[1]/ul/li/label')).click();
          browser.driver.sleep(browser.params.time);
          element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/aadhya-dynamic-modal[2]/div/div/div[2]/div[2]/div[2]/div[2]/div[1]/div/a')).click();
          browser.driver.sleep(browser.params.time);
          element(by.buttonText('Share')).click();
          browser.driver.sleep(browser.params.time);
        });*/
        //18
        /*it('user can delete the folder ',function(){
          
          browser.driver.sleep(browser.params.time);
          element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/div/div[1]/a/i')).click();
          browser.driver.sleep(browser.params.time);
          element(by.linkText('Delete')).click();
          browser.driver.sleep(browser.params.time);
          let ale=browser.switchTo().alert();
    browser.driver.sleep(5000);
    ale.accept();
          browser.driver.sleep(15000);
        browser.driver.sleep(browser.params.time);
        });
        //------------------------------------search operation------------------------------
    //19
    it('user can search file/folder by useing search box',function(){
      element(by.xpath('//*[@id="search"]')).click();
      browser.driver.sleep(browser.params.time);
      element(by.xpath('//*[@id="search"]')).sendKeys('e.pdf')
      browser.driver.sleep(browser.params.time);
      var a=element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/div/span[2]/a/span[2]'));
      expect(a.getText()).toBe('e.pdf');
      browser.driver.sleep(browser.params.time);
      element(by.xpath('//*[@id="search"]')).clear();
      browser.driver.sleep(browser.params.time);
      element(by.xpath('//*[@id="search"]')).click();
      browser.driver.sleep(browser.params.time);
    });
    
    it("user can file/folder list view style",function() {
     element(by.xpath('/html/body/aap-zapoj/app-chat-page/div/div/div/div/div/aadhya-filesharing/div/div/div[1]/div/div[2]/ul/li[2]/a/i')).click();
     browser.driver.sleep(browser.params.time);
     var a=element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/div/span/a/span[2]'));
     expect(a.isPresent()).toBe(true);
     browser.driver.sleep(browser.params.time);
    });
    
    it("user can file/folder Thumb view style",function() {
        element(by.xpath('/html/body/aap-zapoj/app-chat-page/div/div/div/div/div/aadhya-filesharing/div/div/div[1]/div/div[2]/ul/li[2]/a/i')).click();
        browser.driver.sleep(browser.params.time);
        var a=element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/div/span/a/span[2]'));
        expect(a.isPresent()).toBe(true);
        browser.driver.sleep(browser.params.time);
       });
       
       /*it('user can search file/folder by useing search filter',function(){
        element(by.xpath('/html/body/aap-zapoj/app-chat-page/div/div/div/div/div/aadhya-filesharing/div/div/div[1]/div/div[2]/ul/li[3]/div/a/i')).click();
        browser.driver.sleep(browser.params.time);
        element(by.xpath('//*[@id="type-pdf"]')).click();
        browser.driver.sleep(browser.params.time);
        var a=element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/div/span[2]/a/span[2]'));
        expect(a.getText()).toBe('e.pdf');
        browser.driver.sleep(browser.params.time);
       });*/
    //20
    
      
    //-------------------------file operations ---------------------------------------------------------------
    
        //11
    
       /* 
        it('user can download the folder',function(){
          element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/div/div[1]/a/i')).click();
          browser.driver.sleep(browser.params.time);
          element(by.xpath('//*[@id="my_files"]/div/div[2]/div/div/div[1]/aadhya-file-details-tileview/div/div/div[2]/div/aadhya-file-operations/div/div[1]/ul/li[3]/a')).click();
          browser.driver.sleep(browser.params.time);
         });*/
    //21
    
    it("login user can logout the application",function()
    {

    obj.clickOnUserProfile();
    obj.signout();
    expect(obj.passwordTextPresent()).toBe(true);
    
    });
        
    });
    