// global constants
const firstHour = 8; // first hour of the day is 8 (8 am)
const lastHour = 18; // last hour of the day is 18 (6 pm)
const hourPrefix = "hour-" // prefix for hour element id tags, used with hour value 8 through 18

// object variable to store daily events based on hour
var myEvents = {};

// 1. on load
//    load myEvents from localStorage or initialize myEvents object
//    generate time-blocks
//    format time blocks
//    add page current date
//    start time interval
// 2. inside time interval, updates every minute (60,000 ms)
//    update page date
//    update time-block formatting
// 3. time-blocks are text-areas, can be typed in
//    when save icon is clicked, save that time block to myEvents
//    display temporary success message at top of page (timeout)
//    save myEvents to localStorage


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  
  updatePageDate();
  fillTimeBlockContainer();
  formatTimeBlocks();
  revealPage();
  dateAndTime();


    //---------------------------------//
   //  Function: updatePageDate       //
  //---------------------------------//
 // updates page with current date and time
  function updatePageDate() {
    var currentDate = dayjs().format("dddd MMMM D, YYYY");
    var currentTime = dayjs().format("h:mm a");
    $( "#currentDay" ).text(currentDate + " ⸻ " + currentTime);
  }


     //---------------------------------//
    //  Function: addTimeBlocks        //
   //---------------------------------//
  // adds timeblocks to the page
  function fillTimeBlockContainer() {
    var element;
    var hourLabel;
    for (var hour = firstHour; hour < lastHour + 1; hour++) {
      addTimeBlock(hour);
      // add hour label
      // hourLabel = convert24hrTo12hr(hour);
      // element = $( "#" + hourPrefix + hour );
      // element.children('.hour').text(hourLabel);
    }
    loadMyEvents();
    populateMyEvents();
    
  }


  function addTimeBlock(h) {
    var tbContainer = $( "#time-block-container" );
    
    // add time-block div
    var timeBlockDiv = $("<div>");
    timeBlockDiv.attr('id', hourPrefix + h);
    timeBlockDiv.addClass('row time-block past');
    tbContainer.append(timeBlockDiv);

    // add hour div
    var hourDiv = $("<div>");
    hourDiv.addClass('col-2 col-md-1 hour text-center py-3');
    timeBlockDiv.append(hourDiv);
    hourLabel = convert24hrTo12hr(h);
    // timeBlockDiv.text('9AM');

    // add description textarea
    var descriptionTA = $("<textarea>");
    descriptionTA.addClass('col-8 col-md-10 description');
    descriptionTA.attr('rows', 3);
    timeBlockDiv.append(descriptionTA);

    // add save button
    var saveButton = $('<button>');
    saveButton.addClass('btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save');
    timeBlockDiv.append(saveButton);

    // add save icon
    var saveIcon = $("<i>");
    saveButton.addClass('fas fa-save');
    saveButton.attr("aria-hidden", true);
    saveButton.append(saveIcon);
  }


     //---------------------------------//
    //  Function: convert24hrTo12hr    //
   //---------------------------------//
  // takes in 24-hour input and returns 12-hr time with AM/PM
  function convert24hrTo12hr(inputHour) {
    return dayjs().hour(inputHour).format("hA"); // 17 => '5PM', 9 => '9AM'
  }


     //---------------------------------//
    //  Function: loadMyEvents         //
   //---------------------------------//
  // load myEvents from localStorage, initialize if not found
  function loadMyEvents() {
    myEvents = JSON.parse(localStorage.getItem("myEventsStringify"));

    // if my events aren't saved in local storage, initialize the object variable
    if (!myEvents) {
      initializeMyEvents();
    }
  }


     //---------------------------------//
    //  Function: initializeMyEvents   //
   //---------------------------------//
  // populate myEvents object variable based on start and end hours
  function initializeMyEvents() {
    myEvents = {};
    for (var hour = firstHour; hour < lastHour + 1 ; hour++) {
      myEvents[hour] = "";
    }
    saveMyEvents();
  }


     //---------------------------------//
    //  Function: populateMyEvents     //
   //---------------------------------//
  // add event text to timeblocks
  function populateMyEvents() {
    for (var hour = firstHour; hour < lastHour + 1; hour++) {
      $("#" + hourPrefix + hour).children(".description").text(myEvents[hour]);
    }
  }


     //---------------------------------//
    //  Function: formatTimeBlocks     //
   //---------------------------------//
  // formats input timeblocks by updating the timeblock class
  function formatTimeBlocks() {
    // strings used with addition of past, present, or future class
    const pastStr = "past";
    const presentStr = "present";
    const futureStr = "future";
    // use dayjs to get current hour in 24-hr time, convert to a number
    var currentHour = Number(dayjs().format('H'));
    var element;

    // update format class for every hour block based on current hour
    for (var hour = firstHour; hour < lastHour + 1; hour++) {

      // get element id based on the input argument
      // element = document.getElementById(hourPrefix + hour);////////////////////////////////////////
      element = $( "#" + hourPrefix + hour );

      // remove past, present, and future classes
      element.removeClass(pastStr, presentStr, futureStr);
      
      // apply hour element class name conditionally based on current hour
      // formatting will automatically be applied from style.css
      if (hour < currentHour) {
        element.removeClass(pastStr).addClass(pastStr);
      } else if (hour === currentHour) {
        element.removeClass(pastStr).addClass(presentStr);
      } else {
        element.removeClass(pastStr).addClass(futureStr);
      }
    }
  }


     //---------------------------------//
    //  Function: revealPage           //
   //---------------------------------//
  // fade in the page to prevent flickering
  function revealPage() {
    $( 'body' ).css('opacity', 1);
  }
  
  
   //---------------------------------//
  //  Function: dateAndTime          //
 //---------------------------------//
// sets time interval for page refresh every 1 min (60000 ms)
  function dateAndTime() {
    var timeInterval = setInterval(function() {

      updatePageDate();
      formatTimeBlocks(); 

      console.log('tick');
    }, 1000);
  }


     //---------------------------------//
    //  Save button event listener     //
   //---------------------------------//
  // save button click event listener
  $( "#time-block-container" ).on( "click", ".saveBtn", function( event ) {
    event.preventDefault();

    // get the hour element ID of the clicked button
    var elementID = $(event.target).parents('.time-block').attr('id');
    console.log(elementID);
    console.log(typeof(elementID));

    // get the hour number
    var elementHour = Number(elementID.slice(5));

    saveSingleEvent(elementHour);
  } );

     //---------------------------------//
    //  Function: saveSingleEvent      //
   //---------------------------------//
  // save a single event to myEvents and local storage based on hour argument
  function saveSingleEvent(hour) {
    if (hour >= firstHour && hour <= lastHour) {
      myEvents[hour] = $(hourPrefix + hour).children(".description").val();
    }
    saveMyEvents();
  }

     //---------------------------------//
    //  Function: saveMyEvents         //
   //---------------------------------//
  // save myEvents object variable to localStorage, notify user
  function saveMyEvents() {
    localStorage.setItem("myEventsStringify", JSON.stringify(myEvents));
    messageSaveSuccess();
  }

     //---------------------------------//
    //  Function: messageSaveSuccess   //
   //---------------------------------//
  // display a temporary message of success after saving
function messageSaveSuccess() {
    var saveSuccess = $("#save-success-message");
    saveSuccess.css("opacity", 1);

    // display the message for 3 seconds
    setTimeout(function(){
      saveSuccess.css("opacity", 0);
    }, 3000);

  }




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

  

});