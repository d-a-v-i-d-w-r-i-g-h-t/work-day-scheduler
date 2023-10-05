// pointer variables


// global constants
const firstHour = 8; // first hour of the day is 8 (8 am)
const lastHour = 18; // last hour of the day is 18 (6 pm)
const hourPrefix = "hour-" // prefix for hour element id tags, used with hour value 8 through 18
// global variables

// object variable to store daily events based on hour
var myEvents = {};




// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


// entered text will sit there but won't be save until save button is clicked
// only saves the row that was clicked
// something should change color to indicate 'saved'

function loadMyEvents() {
  myEvents = JSON.parse(localStorage.getItem("myEventsStringify"));

  var myEventsKeys = Object.keys(myEvents);

  // if high scores aren't saved in local storage, initialize the object variable
  if (!myEvents) {
    initializeMyEvents();
  }
}

// save myEvents object variable to localStorage, notify user
function saveMyEvents() {
  localStorage.setItem("myEventsStringify", JSON.stringify(myEvents));
  messageSaveSuccess();
}

function messageSaveSuccess() {
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
}

function initializeMyEvents() {
  myEvents = {};
  for (var h = firstHour; h <= lastHour; h++) {
    myEvents[h] = "";
  }
  saveMyEvents();
}

// takes in 24-hour input and returns 12-hr time with AM/PM
function convert24hrTo12hr(inputHour) {
  return dayjs().hour(inputHour).format("hA"); // 17 => '5PM', 9 => '9AM'
}

// add event text to timeblocks
function updateMyEvents() {
  for (var h = firstHour; h < lastHour + 1; h++) {
    // document.getElementById(hourPrefix + h).textContent = myEvents[h];////////////////////
    $(hourPrefix + h).children("description").textContent = myEvents[h];
  }hour
}

// save a single event to myEvents and local storage based on hour argument
function saveSingleEvent(hour) {
  if (hour >= firstHour && hour <= lastHour) {
    // myEvents[hour] = document.getElementById(hourPrefix + hour).textContent////////////////////
    myEvents[hour] = $(hourPrefix + hour).children("description").textContent
  }
  saveMyEvents();
}


// formats input timeblocks by updating the timeblock class
function formatTimeBlocks() {
   // strings used with addition of past, present, or future class
   const timeBlockClassPrefix = "row time-block ";
   const pastStr = "past";
   const presentStr = "present";
   const futureStr = "future";
  // use dayjs to get current hour in 24-hr time, convert to a number
  var currentHour = Number(dayjs().format('H'));
  var element;

  // update format class for every hour block based on current hour
  for (var h = firstHour; h < lastHour + 1; h++) {

    // get element id based on the input argument
    // element = document.getElementById(hourPrefix + hour);////////////////////////////////////////
    element = $(hourPrefix + hour);

    // apply hour element class name conditionally based on current hour
    // formatting will automatically be applied from style.css
    if (hour < currentHour) {
      element.className = timeBlockClassPrefix + pastStr;
    } else if (hour === currentHour) {
      element.className = timeBlockClassPrefix + presentStr;
    } else {
      element.className = timeBlockClassPrefix + futureStr;
    }
  }
}


});