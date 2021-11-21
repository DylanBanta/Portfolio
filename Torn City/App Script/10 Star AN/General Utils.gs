function onOpen() { //Custom Menu
  SpreadsheetApp.getUi()
      .createMenu('Torn City Scripts')
      .addItem('Reload Today\'s Data', 'newDay')
      .addItem('Merit Raffle', 'meritRaffle')
      .addToUi();
}

//Get a timestamp at the time the function is run
function getUnixTime(){
  var date = new Date();
  
  //Format the timestamp to match Torn City's Timestamps
  var now = Math.floor((date.getTime()/1000)).toString();
  
  if(debug){
    Logger.log('now | ', now);
  }
  
  return now;
}

function timeData(selection){
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; //Days
  var sDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']; //Short days
  var vsDays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']; //Very short days
  
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var sMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var vsMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  
  var now = new Date();
  var date = now.getDate();
  var day = now.getDay();
  var month = now.getMonth();
  var year = now.getFullYear();
  
  var onejan = new Date(now.getFullYear(), 0, 1);
  var week = Math.ceil( (((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7 );
  
  switch(selection){
    case 'weekday':
      var weekdayArr = new Array();
      
      weekdayArr.push(days[day]);
      weekdayArr.push(sDays[day]);
      weekdayArr.push(vsDays[day]);
      
      if(debug){
        Logger.log('weekdayArr[0]', weekdayArr[0], 'weekdayArr[1]', weekdayArr[1], 'weekdayArr[2]', weekdayArr[2]);
      }
      
      return weekdayArr;
    
    case 'date':
      if(debug){
        Logger.log('date', date);
      }
      return date;
      
    case 'week':
      return week;
    
    case 'month':
      
      var monthArr = new Array();
      
      monthArr.push(months[month]);
      monthArr.push(sMonths[month]);
      monthArr.push(vsMonths[month]);
      
      if(debug){
        Logger.log('monthArr[0]', monthArr[0], 'monthArr[1]', monthArr[1], 'monthArr[2]', monthArr[2]);
      }
      return monthArr;
    
    case 'year':
      return year;
  } //Exit switch
}



//Save the JSON to Google Drive.
//*WARNING* Replaces file with existing name.
function saveJSON(folderName, fileName, content){
  var thisFile, thisID, del;
  
  var dir = DriveApp.getFoldersByName(folderName).next(); //Select Directory Folder
  var list = dir.getFilesByName(fileName); //Select File by Filename
  
  //Will loop until there are no files with the same Filename in the Folder
  while(list.hasNext()){
    thisFile = list.next(); //Get the next file with the Filename in the folder
    thisID = thisFile.getId(); //Get ID for current file
    
    del = Drive.Files.remove(thisID); //Delete the file by ID
  }
  
  //Create a new file with the Filename containing the content
  var file = dir.createFile(fileName, content);
}

//Loads JSON From the Google Drive
function loadJSON(folderName, fileName){
  var dir = DriveApp.getFoldersByName(folderName).next(); //Select the Directory Folder
  var list = dir.getFilesByName(fileName); //Select File by Filename
  
  if(list.hasNext()){
    var file = list.next(); //Set the current file
    var content = file.getBlob().getDataAsString(); //Get the files content as a string
    var json = JSON.parse(content); //Convert to Json
    
    if(debug){
      Logger.log(JSON.stringify(json, null, 2)); //Pretty Print
    }
    
    return json;
  }
  
}

function getLastRow(sheet, col){  
  
  var range = col + '1:' + col;
  
  if(debug){
    Logger.log('col', col, 'range', range);
  }
  
  var values = sheet.getRange(range).getValues();
  var last = values.filter(String).length;
  
  if(debug){
    Logger.log('last', last);
  }
  
  return last;
}

function firstEmptyRow(sheet, col){
  var emptyRow = getLastRow(sheet, col);
  emptyRow++;
  
  if(debug){
    Logger.log('emptyRow', emptyRow);
  }
  
  return emptyRow;
}