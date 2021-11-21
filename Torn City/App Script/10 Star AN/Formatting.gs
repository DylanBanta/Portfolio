function colorCellBG(sheet, range, colors, shade){
  var cells = sheet.getRange(range);
  cells.setBackground(colors[shade]);
}

function formattedDate(selection){
  var weekdayArr = timeData('weekday');
  var date = timeData('date');
  var monthArr = timeData('month');
  var year = timeData('year');
  var week = timeData('week');
  
  //Not sure if I'll use all of these but I figured I'd make them now and use them if I need them
  //If not TODO Delete unused naming conventions
  var properName = weekdayArr[0] + ', ' + monthArr[0] + ' ' + date + ', ' + year + ' | Week ' + week; 
  var shortName =  weekdayArr[1] + ', ' + monthArr[1] + ' ' + date + ', ' + year + ' | Week ' + week; 
  var veryShortName =  weekdayArr[2] + ' ' + monthArr[2] + '/' + date + '/' + year + ' | ' + week;
  
  if(debug){
    Logger.log('properName', properName);
    Logger.log('shortName', shortName);
    Logger.log('veryShortName', veryShortName);
  }
  
  switch(selection){
    case 'properName':
      return properName;
    case 'shortName':
      return shortName;
    case 'veryShortName':
      return veryShortName;
    case 'jsonName':
      return jsonName;
  }
}

function effectivenessFormatting(data, posData, hpData, range){

    if(posData == 0){
      colorCellBG(eSheet, range, positionColors, 3);
    } else {
      if(data < posData){
        colorCellBG(eSheet, range, positionColors, 0);
      } else if (data >= posData && data < hpData) {
        colorCellBG(eSheet, range, positionColors, 1);
      } else if (data >= hpData) {
        colorCellBG(eSheet, range, positionColors, 2);
      }
    }
}

function formatEmployeesPage(employeeArr, dataArr){
  var range;
    //Loop through all employees
    for(var i = 0; i < employeeArr.length; i++){
    
    //Loop through all data for each employee
    for(var h = 0; h < dataArr.length; h++){

      var workStats = new Array();
      var man, int, end;
      var hMan, hInt, hEnd;
      var hpMan, hpInt, hpEnd;

      //Set the current cell range for the data
      range = alphaArr[h] + (i + 2);

      //var cleanerEnd = getPositionStat('Cleaner', 'end');
      if(dataArr[h] == 'position'){

        var posData = employeeArr[i][dataArr[h]];
        var posMan, posInt, posEnd;
        posMan = getPositionStat(posData, 'man');
        posInt = getPositionStat(posData, 'int');
        posEnd = getPositionStat(posData, 'end');

        // @ts-ignore
        hMan = posMan/2;
        // @ts-ignore
        hInt = posInt/2;
        // @ts-ignore
        hEnd = posEnd/2;

        // @ts-ignore
        hpMan = posMan *2;
        // @ts-ignore
        hpInt = posInt *2;
        // @ts-ignore
        hpEnd = posEnd *2;
      }
      
      if(dataArr[h] == 'manual_labor'){
        var data = employeeArr[i][dataArr[h]];
        effectivenessFormatting(data, posMan, hpMan, range);
      }

      if(dataArr[h] == 'intelligence'){
        var data = employeeArr[i][dataArr[h]];
        effectivenessFormatting(data, posInt, hpInt, range);
      }

      if(dataArr[h] == 'endurance'){
        var data = employeeArr[i][dataArr[h]];
        effectivenessFormatting(data, posEnd, hpEnd, range);
      }

      //Format Addiction colors
      if(dataArr[h] == 'addiction'){
        
        if(employeeArr[i][dataArr[h]] < -15){
          colorCellBG(eSheet, range, redColors, 3);
        } else if(employeeArr[i][dataArr[h]] < -10){
          colorCellBG(eSheet, range, redColors, 2);
        } else if(employeeArr[i][dataArr[h]] < -5){
          colorCellBG(eSheet, range, redColors, 1);
        } else if(employeeArr[i][dataArr[h]] < 0){
          colorCellBG(eSheet, range, redColors, 0);
        } else { //Set to white
          colorCellBG(eSheet, range, redColors, 5);
        }
      }
      
      //Format Total Effectiveness
      if(dataArr[h] == 'total_effectiveness'){
        if(employeeArr[i][dataArr[h]] < 101){
          colorCellBG(eSheet, range, redColors, 3);
        } else if(employeeArr[i][dataArr[h]] < 115){
          colorCellBG(eSheet, range, redColors, 2);
        } else if(employeeArr[i][dataArr[h]] < 125){
          colorCellBG(eSheet, range, redColors, 1);
        } else if(employeeArr[i][dataArr[h]] < 130){
          colorCellBG(eSheet, range, redColors, 0);
        } else { //Set to white
          colorCellBG(eSheet, range, redColors, 5);
        }
      }

    }
  }
}