// global constants
const firstHour = 8; // first hour of the day is 8 (8 am)
const lastHour = 18; // last hour of the day is 18 (6 pm)
const hourPrefix = "#hour-" // prefix for hour element id tags, used with hour value 8 through 18

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
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  updatePageDate();
  loadMyEvents();
  // addTimeBlocks(); ///////////////////////////////////
  formatTimeBlocks();
  revealPage();
  dateAndTime();


   //-------------------------//
  //  Function: dateAndTime  //
 //-------------------------//
// sets time interval for page refresh every 1 min (60000 ms)
  function dateAndTime() {
    var timeInterval = setInterval(function() {

      updatePageDate();
      formatTimeBlocks(); 

      console.log('tick');
    }, 1000);
  }

    //----------------------------//
   //  Function: updatePageDate  //
  //----------------------------//
 // updates page with current date
  function updatePageDate() {
    var currentDate = dayjs().format("MMMM D, YYYY");
    $( "#currentDay" ).text(currentDate);
  }


     //--------------------------//
    //  Function: loadMyEvents  //
   //--------------------------//
  // load myEvents from localStorage, initialize if not found
  function loadMyEvents() {
    myEvents = JSON.parse(localStorage.getItem("myEventsStringify"));

    // if high scores aren't saved in local storage, initialize the object variable
    if (!myEvents) {
      initializeMyEvents();
    }
  }

     //--------------------------------//
    //  Function: initializeMyEvents  //
   //--------------------------------//
  // populate myEvents object variable based on start and end hours
  function initializeMyEvents() {
    myEvents = {};
    for (var hour = firstHour; hour < lastHour + 1 ; hour++) {
      myEvents[hour] = "";
    }
    saveMyEvents();
  }


     //---------------------------//
    //  Function: addTimeBlocks  //
   //---------------------------//
  // adds timeblocks to the page
  function addTimeBlocks() {
    for (var hour = firstHour; hour < lastHour + 1; hour++) {
      //add timeblock
      // add hour label
      $( hourPrefix + hour ).children('div').text(convert24hrTo12hr(hour));

    }

  }
     //-------------------------------//
    //  Function: convert24hrTo12hr  //
   //-------------------------------//
  // takes in 24-hour input and returns 12-hr time with AM/PM
  function convert24hrTo12hr(inputHour) {
    return dayjs().hour(inputHour).format("hA"); // 17 => '5PM', 9 => '9AM'
  }


     //----------------------------//
    //  Function: updateMyEvents  //
   //----------------------------//
  // add event text to timeblocks
  function updateMyEvents() {
    for (var hour = firstHour; hour < lastHour + 1; hour++) {
      $(hourPrefix + hour).children("description").text(myEvents[hour]);
    }
  }



     //------------------------------//
    //  Function: formatTimeBlocks  //
   //------------------------------//
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
      element = $(hourPrefix + hour);

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


     //------------------------------//
    //  Save button event listener  //
   //------------------------------//
  // save button click event listener
function revealPage() {
  $( 'body' ).css('opacity', 1);
}


     //------------------------------//
    //  Save button event listener  //
   //------------------------------//
  // save button click event listener
  $( "#time-block-container" ).on( "click", function( event ) {
    event.preventDefault();

    // get the hour element ID of the clicked button
    var elementID = $(event.target).parent().attr('id');
    // get the hour number
    var elementHour = Number(elementID.slice(5));
    
    saveSingleEvent(elementHour);
  } );

     //-----------------------------//
    //  Function: saveSingleEvent  //
   //-----------------------------//
  // save a single event to myEvents and local storage based on hour argument
  function saveSingleEvent(hour) {
    if (hour >= firstHour && hour <= lastHour) {
      myEvents[hour] = $(hourPrefix + hour).children("description").text();
    }
    saveMyEvents();
  }

     //--------------------------//
    //  Function: saveMyEvents  //
   //--------------------------//
  // save myEvents object variable to localStorage, notify user
  function saveMyEvents() {
    localStorage.setItem("myEventsStringify", JSON.stringify(myEvents));
    messageSaveSuccess();
  }

     //--------------------------------//
    //  Function: messageSaveSuccess  //
   //--------------------------------//
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