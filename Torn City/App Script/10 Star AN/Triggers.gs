//Google Triggers Every Day
function newDay(){
  var day = timeData('weekday');
  var date = timeData('date');
  var month = timeData('month');

  //Update Employee Sheet Daily
  employeeSheet();

  //Copy New Employee Sheet and add to reports
  dailyReport();

  //Check for New Week
  if(day[0] == 'Saturday'){
    newWeek();
  }

  //Check for New Month
  if(date == 1){
    newMonth();
    
    //If new Month is January, it's also a New Year
    if(month[0] == 'January'){
      newYear();
    }
  }
}

function newWeek(){

}

function newMonth(){

}

function newYear(){

}