
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
specs:['Workspace.js','Thems.js'],
    
allScriptsTimeout: 1200000,
getPageTimeout: 1200000,
jasmineNodeOpts: {
  defaultTimeoutInterval: 1200000,
},
capabilities: {
  'browserName': 'chrome',
'shardTestFiles': true,
  'maxInstances': 1,
},
onPrepare: function() {
  browser.waitForAngularEnabled(false);
  browser.driver.manage().window().maximize();
  jasmine.getEnv().addReporter(new HtmlReporter({
  baseDirectory: 'report',
  //preserveDirectory: false,
  screenshotsSubfolder: 'images',
  jsonsSubfolder: 'jsons'
  , docTitle: 'Member portal report' 
  }).getJasmine2Reporter());
  }

}
