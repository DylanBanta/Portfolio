//Add HtmlService for on screen modal spinning wheel
//and is called from Torn City Scripts > Merit Raffle
function meritRaffle(){
  var data = raffleSpin();
  var html = HtmlService.createHtmlOutput(data)
    .setWidth(525)
    .setHeight(525);
  SpreadsheetApp.getUi()
    .showModalDialog(html, 'Spin');
}

function getEmployeeRaffle(){ //returns data for raffle tickets
  var entry;
  var employeeArr = getEmployeeArr(); //Get array of employee objects from FetchUtils
  var id, employee, empID, tickets, nameRange, ticketRange, offset; //Variables
  var entryList = new Array(); //Holds entries by name and number of entries [['Employee1', 4],['Employee2',2]]
  
  for (var i = 0; i < employeeArr.length; i++){ //Loop through all employees
    
    entry = null; //Reset
    id = employeeArr[i]['id']; //Current employee's ID
    employee = employeeArr[i]['name'] //Current Employee's Name
    empID = employee + ' [' + id + ']'; //Name + ID (for sheet)
    tickets = employeeArr[i]['merits']; //Number of merits (raffle tickets)
    
    if(debug){
      Logger.log('empID', empID, 'tickets', tickets);
    }
    
    //Range offsets
    offset = (i + 2); 
    nameRange = 'A' + offset;
    ticketRange = 'B' + offset;
    
    mSheet.getRange(nameRange).setValue(empID);
    if(tickets == null){ 
      mSheet.getRange(ticketRange).setValue(0); //add 0 on raffle sheet
    } else {
      mSheet.getRange(ticketRange).setValue(tickets); //add number of tickets to raffle sheet
      
      //create list of entries
      entry = [employee, tickets];
      entryList.push(entry);
    }
  }
  
  return entryList;
}

//Creates the iFrame and updates the Merit Raffle sheet with current data
function raffleSpin(){ //Builds the iFrame for wheeldecide.com
  
  var entryList = getEmployeeRaffle();
  var name; //Name on wheel
  var count; //Number of entries
  var htmlOffset;
  
  
  //String vars used to build iFrame
  var htmlStart = '<iframe src="https://wheeldecide.com/e.php?';
  var htmlEntries = ''; //Instantiate empty string
  var htmlCol = 'cols=EA4335,FF9900,FFFF00,00FF00,00FFFF,4A86E8,9900FF,FF00FF,783F04,FF87B3&';
  var htmlMid = 'time=5&';
  var htmlWeights = 'weights=';
  var htmlEnd = 'width="500" height="500" scrolling="no" frameborder="0"></iframe>';
  
  /* Example iFrame parts
      <iframe src="https://wheeldecide.com/e.php?
      c1=Lolinski&c2=Bailey01&c3=its_a_me
      &cols=EA4335,FF9900,FFFF00,00FF00,00FFFF,4A86E8,9900FF,FF00FF,783F04,FF87B3
      &time=5&weights=2,4,2"
      width="500"
      height="500"
      scrolling="no"
      frameborder="0"></iframe>
  */
  
  for(var i = 0; i < entryList.length; i++){ //loop through entry list
    
    //get name and entries
    htmlOffset = i + 1;
    name = entryList[i][0];
    count = entryList[i][1];
    
    //string builder
    htmlEntries += 'c' + htmlOffset + '=' + name + '&';
    
    if(debug){
      Logger.log('name', name, 'count', count);
      Logger.log('htmlEntries', htmlEntries);
    }
    
    //string builder
    htmlWeights += count + ',';
  }
  
  //complete the iFrame
  var iFrame = htmlStart + htmlEntries + htmlCol + htmlMid + htmlWeights + '\"' + htmlEnd;
  Logger.log('iFrame', iFrame);
  return iFrame;
}