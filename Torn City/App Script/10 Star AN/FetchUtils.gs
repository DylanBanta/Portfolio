//Get the API Key's value from the API sheet
function getAPIKey(){
  var keyRange = 'A2';
  var key = api.getRange(keyRange).getValue();
  return key;
}

//Get the Cooldown Value from the API Sheet
function getCooldown(){
  var cdRange = 'B2';
  var cd = api.getRange(cdRange).getValue();
  // @ts-ignore
  cd *= 60; //Convert Minutes into Seconds
  return cd;
}

function getPositionStat(position, wStat){
  var pos, stat;
  var titleRange = 'A2:A8';
  var manRange = 'B2:B8';
  var intRange = 'C2:C8';
  var endRange = 'D2:D8';
  
  var titles = pSheet.getRange(titleRange).getValues();
  var man = pSheet.getRange(manRange).getValues();
  var int = pSheet.getRange(intRange).getValues();
  var end = pSheet.getRange(endRange).getValues();
  
  for(var i = 0; i < titles.length; i++){
    if(position == titles[i][0]){
      pos = i;
    }
  }
  
  switch(wStat){
    case 'man':
      stat = man[pos][0];
      break;
    case 'int':
      stat = int[pos][0];
      break;
    case 'end':
      stat = end[pos][0];
      break;
  }
  
  if(debug){
    Logger.log('position', position);
    Logger.log('pos', pos);
    Logger.log('wStat', wStat);
    Logger.log('stat', stat);
  }
  
  return stat;
}

function getSheetNameFormat(){
  var data;
  var formatRange = 'C2';
  var format = api.getRange(formatRange).getValue();
  
  switch(format){
    case 0:
      data = 'properName';
      break;
    case 1:
      data = 'shortName';
      break;
    case 2:
      data ='veryShortName';
      break
    default:
      data = format;
      break;
  }  
  return data;
}

function getAPIData(jsonFile, apiType, apiSelections){
  var json = loadJSON('Torn', jsonFile);
  var jsonData;

  if(json == null){
    jsonData = apiCall(apiType, apiSelections);

    saveJSON('Torn', jsonFile, JSON.stringify(jsonData, null, 2));
  } else {
    var now = getUnixTime();
    var timestamp = JSON.stringify(json['timestamp']);
    var difference = parseInt(now) - parseInt(timestamp);
    var cd = getCooldown();

    //Debug Logs
    if(debug){
      Logger.log('now | ' + now);
      Logger.log('timestamp | ' + timestamp);
      Logger.log('difference | ' + difference);
      Logger.log('cooldown | ' + cd);
    }
    
    if(difference < cd){
      Logger.log('USED JSON');
      var jsonData = loadJSON('Torn', jsonFile);
    } else {
      Logger.log('USED API');

      jsonData = apiCall(apiType, apiSelections);

      saveJSON('Torn', jsonFile, JSON.stringify(jsonData, null, 2));
    }
  }

  return jsonData;
}

//Creates an array containing each employee object
function getEmployeeArr(){
  var employeeObj = getAPIData('Employees.json', 'company', ['employees']);
  var idArr = Object.keys(employeeObj['company_employees']);
  var employeeArr = new Array();
  
  //Object variables
  var id, name, position, days, wage, manual_labor, intelligence, endurance, working_stats, settled_in, merits, director_education, addiction, total_effectiveness, last_action;
  
  //Create Objects for each Employee and add each object to employeeArr
  for(var i = 0; i < idArr.length; i++){
    id = idArr[i];
    name = employeeObj['company_employees'][id]['name'];
    position = employeeObj['company_employees'][id]['position'];
    days = employeeObj['company_employees'][id]['days_in_company'];
    wage = employeeObj['company_employees'][id]['wage'];
    manual_labor = employeeObj['company_employees'][id]['manual_labor'];
    intelligence = employeeObj['company_employees'][id]['intelligence'];
    endurance = employeeObj['company_employees'][id]['endurance'];
    working_stats = employeeObj['company_employees'][id]['effectiveness']['working_stats'];
    settled_in = employeeObj['company_employees'][id]['effectiveness']['settled_in'];
    merits = employeeObj['company_employees'][id]['effectiveness']['merits'];
    director_education = employeeObj['company_employees'][id]['effectiveness']['director_education'];
    addiction = employeeObj['company_employees'][id]['effectiveness']['addiction'];
    total_effectiveness = employeeObj['company_employees'][id]['effectiveness']['total'];
    last_action = employeeObj['company_employees'][id]['last_action']['relative'];

    //Create employee object for current employee
    var newEmployee = new protoEmployee(id, name, position, days, wage, manual_labor, intelligence, endurance, working_stats, settled_in, merits, director_education, addiction, total_effectiveness, last_action);
    employeeArr.push(newEmployee);
  }
  
  return employeeArr;
}

function getStockArr(){
  var cost, rrp, price, in_stock, on_order, sold_amount, sold_worth;
  var stockObj = getAPIData('Stock.json', 'company', ['stock']);
  var keys = Object.keys(stockObj['company_stock']);
  Logger.log(keys[0]);
  var stockArr = new Array();

  for(var i = 0; i < keys.length; i++){
    id = keys[i];
    cost = stockObj['company_stock'][id]['cost'];
    rrp = stockObj['company_stock'][id]['rrp'];
    price = stockObj['company_stock'][id]['price'];
    in_stock = stockObj['company_stock'][id]['in_stock'];
    on_order = stockObj['company_stock'][id]['on_order'];
    sold_amount = stockObj['company_stock'][id]['sold_amount'];
    sold_worth = stockObj['company_stock'][id]['sold_worth'];

    var newStock = new protoStock(id, cost, rrp, price, in_stock, on_order, sold_amount, sold_worth);
    stockArr.push(newStock);
  }

  return stockArr;
}

function getStatArr(){
  var statObj = getAPIData('Company.json', 'company', ['profile', 'detailed']);
  var name, type, rating, hired, capacity, dIncome, dCustomers, wIncome, wCustomers, days;
  var bank, popularity, efficiency, environment, ads;
  
  name = statObj['company']['name'];
  type = statObj['company']['company_type'];
  rating = statObj['company']['rating'];
  hired = statObj['company']['employees_hired'];
  capacity = statObj['company']['employees_capacity'];
  dIncome = statObj['company']['daily_income'];
  dCustomers = statObj['company']['daily_customers'];
  wIncome = statObj['company']['weekly_income'];
  wCustomers = statObj['company']['weekly_customers'];
  days = statObj['company']['days_old'];
  
  bank = statObj['company_detailed']['company_bank'];
  popularity = statObj['company_detailed']['popularity'];
  efficiency = statObj['company_detailed']['efficiency'];
  environment = statObj['company_detailed']['environment'];
  ads = statObj['company_detailed']['advertising_budget'];

  var statArr = [name, type, rating, hired, capacity, dIncome, dCustomers, wIncome, wCustomers, days, bank, popularity, efficiency, environment, ads];
  
  return statArr;
}

function protoStock(id, cost, rrp, price, in_stock, on_order, sold_amount, sold_worth){
  this.id = id;
  this.cost = cost;
  this.rrp = rrp;
  this.price = price;
  this.in_stock = in_stock;
  this.on_order = on_order;
  this.sold_amount = sold_amount;
  this.sold_worth = sold_worth;
}

//Used to build a prototype Employee Object
function protoEmployee(id, name, position, days, wage, manual_labor, intelligence, endurance, working_stats, settled_in, merits, director_education, addiction, total_effectiveness, last_action){
  this.id = id;
  this.name = name;
  this.position = position;
  this.days = days;
  this.wage = wage;
  this.manual_labor = manual_labor;
  this.intelligence = intelligence;
  this.endurance = endurance;
  this.working_stats = working_stats;
  this.settled_in = settled_in;
  this.merits = merits;
  this.director_education = director_education;
  this.addiction = addiction;
  this.total_effectiveness = total_effectiveness;
  this.last_action = last_action;
}