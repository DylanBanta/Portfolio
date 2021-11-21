//Toggle Debug Logs
var debug = false;

//Get Spreadsheets
var ss = SpreadsheetApp.getActiveSpreadsheet();
var api = ss.getSheetByName('API');
var reportsList = ss.getSheetByName('Reports List');
var eSheet = ss.getSheetByName('Employees');
var pSheet = ss.getSheetByName('Positions');
var mSheet = ss.getSheetByName('Merit Raffle');
var sSheet = ss.getSheetByName('Statistics');
var stSheet = ss.getSheetByName('Inventory');

//Alphabet Array
var alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ,'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T','U', 'V', 'W', 'X', 'Y', 'Z'];

//Formatting Colors
var redColors = ['#f4cccc', '#ea9999', '#e06666', '#ff0000', '#ffffff']; //['Light Pink', 'Pink', 'Dark Pink', 'Red', 'White']
var positionColors = ['#e06666', '#ffd966', '#93c47d', '#cccccc']; //['Red', 'Yellow', 'Green', 'Gray']

/*
Inventory Sheet TODO
*/

/*
Reports TODO

Create function to get dates for each day/week/month/year | ✓

Create a function that creates a new sheet with appropriate data from arguments

Check Each Employees Stats | ✓
Create a new Daily Report Sheet for that Day | ✓
Log stats to the Daily Report | ✓

Once/Week create a new Weekly Report Sheet | X
Check Each of the Existing Daily Reports for that week | X
Log that data to the weekly report | X

Repeat for Monthly Report | X

Repeat for Yearly Report | X

*/

