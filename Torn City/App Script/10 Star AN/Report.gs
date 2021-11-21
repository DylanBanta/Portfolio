function arrSheetBuilder(dataArr, sheet){
  var range;
  dataArr;

  for(var i = 0; i < dataArr.length; i++){
    range = alphaArr[i] + 2;
    sheet.getRange(range).setValue(dataArr[i]);
  }
}

function objSheetBuilder(objArr, sheet){
  var range;
  var keys = Object.keys(objArr[0]);
  
  for(var i = 0; i < objArr.length; i++){
    for(var j = 0; j < keys.length; j++){
      range = alphaArr[j] + (i + 2);
      sheet.getRange(range).setValue(objArr[i][keys[j]]);
    }
  }
}

function statSheet(){
  var statArr = getStatArr();
  arrSheetBuilder(statArr, sSheet);
}

function stockSheet(){
  var stockArr = getStockArr();
  objSheetBuilder(stockArr, stSheet);
}

function employeeSheet(){
  var employeeArr = getEmployeeArr();
  var keys = Object.keys(employeeArr[0]);
  objSheetBuilder(employeeArr, eSheet);
  formatEmployeesPage(employeeArr, keys);
}

function dailyReport(){

  //Choose Format for sheet name from the API Sheet
  var format = getSheetNameFormat();
  
  //
  var sheetName = formattedDate(format); 
  sheetName += ' | Daily Report';
  if(debug){
    Logger.log(sheetName);
  }

  var url = copySheet(eSheet, sheetName);

  var col = 'A';

  var row = firstEmptyRow(reportsList, col);
  var range = col + row;

  var dataRange = 'A1:' + range;
  var cellData = reportsList.getRange(dataRange).getValues();
  var ii, iRange;

  for(var i = 0; i < cellData.length; i++){ //Prevents duplicate entries in Reports List
    ii = i + 1;
    iRange = col + ii;
    if(sheetName == cellData[i]) {
      reportsList.getRange(iRange).clearContent();
    }
  }

  row = firstEmptyRow(reportsList, col);
  range = col + row;
  


  var cell = reportsList.getRange(range);
  cell.setFormula('=HYPERLINK("' + url + '","' + sheetName + '")');
  
  //reportsList.getRange(range).setValue(sheetName);
}

function copySheet(oldSheet, sheetName){
  var newSheet = ss.getSheetByName(sheetName);
  
  /*
  Checks for existing sheet with sheetName and
  deletes it to avoid throwing an exception
  */
  if(newSheet != null){
    ss.deleteSheet(newSheet);
  }
  
  newSheet = oldSheet.copyTo(ss).setName(sheetName); //ss.insertSheet();
  newSheet.setName(sheetName);
  
  var url = ss.getUrl();
  url += '#gid=';
  url += newSheet.getSheetId();
  
  newSheet.hideSheet();

  return url;
}