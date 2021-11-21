//Make a call to the Torn City API
//Excepts arguments for type and selections from https://www.torn.com/api.html#
function apiCall(type, selections){
  
  if(debug){
    Logger.log('type ' + type);
    Logger.log('selections ' + selections);
  }

  var url;
  
  //Get url by type
  switch(type){
    case 'user':
      url = 'https://api.torn.com/user/?selections=';
      break;
    case 'properties':
      url = 'https://api.torn.com/properties/?selections=';
      break;
    case 'faction':
      url = 'https://api.torn.com/faction/?selections=';
      break;
    case 'company':
      url = 'https://api.torn.com/company/?selections=';
      break;
    case 'market':
      url = 'https://api.torn.com/market/?selections=';
      break;
    case 'torn':
      url = 'https://api.torn.com/torn/?selections=';
      break;
    default:
      url = 'null';
      Logger.log("Api Call Error: Type not found");
      break;
  }
  
  var selectionsString;
  var timeBool = false;
  
  //Loop through selections arr and create a string for the ur
  for(var i = 0; i < selections.length; i++){
    if(selections[i] == 'timestamp'){
      timeBool = true;
    }
    if(i == 0) {
      selectionsString = selections[i];
    } else {
      selectionsString += ',' + selections[i];
    }
  }

  if(!timeBool){
    selectionsString += ',timestamp'; //Always calls timestamp
  }
  
  if(debug){
    Logger.log('selectionsString', selectionsString);
  }
  
  //Append Selections and API Key to URL for HTTP Fetch
  url+= selectionsString + '&key=' + getAPIKey();
  
  //Fetch JSON Data from Torn City API
  var apiFetch = UrlFetchApp.fetch(url);
  var apiJSON = JSON.parse(apiFetch);
  
  if(debug){
    Logger.log('apiJSON', JSON.stringify(apiJSON, null, 2));
  }
  
  return apiJSON;
}


















