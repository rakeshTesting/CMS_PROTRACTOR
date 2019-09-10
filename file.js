function sleep()
{
 browser.driver.sleep(5000);
}

function fileshare()
{

    //2
this.clickOnFileShareOption=function()
{
    element(by.css("a[title='File Sharing'] > .icon-fill")).click();
    sleep();
}
this.checkGroupSecureFileSharePageIsOpened=function()
{
  return  element(by.css("a[href='#my_files']")).isPresent();
}
//2
this.clickOnNewOption=function()
{
    element(by.css('i[class="fa fa-plus"]')).click();
    sleep();

}
this.clickOnFolderOption=function()
{
    element(by.css('i[class="fa fa-folder"]')).click();
    sleep();
}
this.enterFolderName=function(name)
{
    element(by.id('foldernme')).clear().sendKeys(name);
    sleep();
}
this.clcikOnCreateButton=function()
{
    element(by.buttonText('Create')).click();
    browser.driver.sleep(15000);
}

this.checkFolderIsCreated=function()
{
  return  element(by.css('a[title="z"]')).getText();

}
//3
this.clickOnFileOption=function()
{
    element(by.css('i[class="fa fa-file"]')).click();
    sleep();
}
this.uploadTheFile=function(fpath)
{
    var path = require('path'),
    uploadInput = element(by.id('upload-attachement'));
    fileToUpload=__dirname+fpath;
    absolutePath = path.resolve(__dirname, fileToUpload);
    uploadInput.sendKeys(absolutePath);
    sleep();
}
this.clickOnFileUploadButton=function()
{
     
    element(by.buttonText('Upload')).click();
    browser.driver.sleep(10000);
}
this.checkDocFileIsUploaded=function()
{
   return element(by.css('a[title="a.doc"]')).getText();
}
//4

this.checkImageFileIsUploaded=function()
{
 return element(by.css('a[title="b.png"]')).getText();
}

//5
this.checkVideoFileIsUploaded=function()
{
    return element(by.css('a[title="c.flv"]')).getText();
}
//6
this.checkXlsxIsUpLoaded=function()
{
    return element(by.css('a[title="d.xlsx"]')).getText();

}
//7
this.checkPdfFileIsUploaded=function()
{
  return  element(by.css('a[title="e.pdf"]')).getText();
}

//8 
this.clickOnFileOptions=function()
{
    element(by.xpath("//div[@class=' ']/div[4]//i[@class='fa fa-ellipsis-h']")).click();
    sleep();
}
this.clickOnRenameOption=function()
{
    element(by.linkText('Rename')).click();
    sleep();
}

this.enterRename=function(rename)
{
    element(by.name('newName')).clear().sendKeys(rename);
    sleep();
}
this.clickOnSaveButton=function()
{
    element(by.buttonText('Save')).click();
    sleep();
}
this.checkFileRenamedSuccessfully=function()
{
    return element(by.css('a[title="aa.doc"]')).getText();
}
//9
this.clickOnFilePreviewOption=function()
{
    element(by.xpath("//div[@class='dropdown sec-file-option pull-left open']//a[.='Preview']")).click();
    sleep();
}
this.checkFilePreviewIsOpened=function()
{
   return element(by.css(".fa-pencil-square-o")).isPresent();
}
this.closePreviewRightSidePannel=function()
{
    
    element(by.xpath("//i[@class='fa fa-close']")).click();
    sleep();
}
//10
this.clickOnDownloadOption=function()
{
    element(by.css("a[href='https://s3.amazonaws.com/o20190828092008798-securefilesgroups/5d68e43bef85686c4fa8ee36/aa.doc']")).click();
    sleep();
}
//11
this.clickOnOption=function(action)
{
    element(by.linkText(action)).click();
    sleep();
}
this.selectFolder=function()
{
    element(by.xpath("//ul[@class='root-folder list-unstyled']//span[contains(.,'Z1')]")).click();
    sleep();
}
this.clickOnButton=function(action)
{
    element(by.buttonText(action)).click();
    sleep();
}
}

module.exports = new fileshare();