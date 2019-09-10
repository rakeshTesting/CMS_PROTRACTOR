
var xlsx = require('xlsx');
var workbook = xlsx.readFile('./a.xlsx');
var worksheet = workbook.Sheets['devEnv'];
var data= xlsx.utils.sheet_to_json(worksheet);

function util()
{
this.url=data[0].info;
this.userName=data[1].info;
this.password=data[2].info;
this.chatUserName=data[3].info;
this.InstantName=data[4].info;
this.groupName=data[5].info;
this.channelName=data[6].info
}

module.exports = new util();

