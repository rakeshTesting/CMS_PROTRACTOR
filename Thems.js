var data = require('./Reuse.js')
var obj = require('./tms.js');
describe('Thems',function() {

  //1
 it('user login to the application', function() {

   obj.getUrl(data.url);
   obj.userName(data.userName);
   obj.password(data.password);
   obj.Login();
   expect(obj.searchBoxPresent()).toBe(true);

    });
    
    //2
   it('login to the application then user can see theme sky-blue color', function() {

      expect(obj.themeColorSkyBluePresent()).toContain('rgba(33, 143, 174, 1)');   

    });
        //3


        it("Opening Theme list",function(){

          obj.clickSettingIcon();
          obj.clickOnThemsOption();
          expect(obj.themsListpresent()).toBe(true);
        
        });
        //4
        it('themes color changeing to Theme1', function () {

          obj.clickOnTheme1();
          expect(obj.layoutChangedTheme()).toContain('rgba(33, 14, 24, 0.81)');   
        
        });
         //5
         it('themes color changeing to Theme2', function () {
          
          obj.clickOnTheme2();
          expect(obj.layoutChangedTheme()).toContain('rgba(3, 53, 76, 1)');   
          
        });
         //6
         it('themes color changeing to Theme3', function () {
          
        obj.clickOnTheme3();
          expect(obj.layoutChangedTheme()).toContain('rgba(34, 45, 50, 1)');   
          
        });
        //7
        it('themes color changeing to Theme4', function () {

        obj.clickOnTheme4();
          expect(obj.layoutChangedTheme()).toContain('rgba(79, 47, 76, 1)');   
          
        });
        //8
        it('themes color changeing to Theme5', function () {

          obj.clickOnTheme5();
          expect(obj.layoutChangedTheme()).toContain('rgba(8, 95, 101, 1)');   
        
        });
        //9
        it('themes color changeing to Theme6', function () {
          
          obj.clickOnTheme6();
          expect(obj.layoutChangedTheme()).toContain('rgba(109, 76, 65, 1)');   
      
        });
        //10
    
        it('themes color changeing to Theme7', function () {
          
          obj.clickOnTheme7();
          expect(obj.layoutChangedTheme()).toContain('rgba(69, 90, 100, 1)');   
          
        });
        //11
        it('themes color changeing to default', function () {
         
          obj.clickDefaultTheme();
         expect(obj.layoutChangedTheme()).toContain('rgba(33, 143, 174, 1)');   
         obj.clickOnSaveButton();
         
       });
   
        //12
        
        it("user logout the application",function()
     {
          obj.clickOnUserProfile();
          obj.signout();
         expect(obj.passwordTextPresent()).toBe(true);
      });
    });
   