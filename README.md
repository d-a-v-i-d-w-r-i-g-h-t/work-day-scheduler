# Work Day Scheduler

## Description 

For this project, I was provided with a basic HTML and CSS framework for a daily schedule and tasked to add dynamic formatting, updating, and persistent local storage capability. There were static example "time blocks" in the provided HTML having different coloring for past, present, and future events, but this formatting needed to be updated continuously based on the current time of day.





I deployed the application on [GitHub](https://github.com/) [Pages](https://pages.github.com/), and it can be found [here](https://d-a-v-i-d-w-r-i-g-h-t.github.io/work-day-scheduler/).


## Installation

N/A


## Usage 

The following is a screenshot of the Work Day scheduler.

On page load, the Work Day Scheduler attempts to retrieve events from local storage. If there are no stored events, the scheduler is loaded with blank entry fields. A number of hourly time blocks are then generated and appended to the page based on global constants ```firstHour``` and ```lastHour```. Although not directly modifiable by the user, the code is built with the future option available.

![Screenshot of work day scheduler application](assets/images/work-day-scheduler.png)

Below the title and welcome message, the current date and time are displayed, automatically updated every minute. Additionally, color formatting is dynamically applied to the hourly time blocks based on the current time. The current hour is highlighted red, hours in the past are gray, and hours in the future are green. The same one-minute update frequency appiles to this formatting as well.

Any time block can be clicked on for user entry of an event description. If the user clicks the save icon on the right side of the time block, that event description will be saved to local storage and will persist between sessions. Upon save, a save notification message is displayed to the user in the header below the date, as shown below:

![Screenshot of work day scheduler application](assets/images/save-message.png)


## Credits

I read the [Day.js](https://day.js.org/en/) documentation to learn about time and date [formatting](https://day.js.org/docs/en/display/format).

I learned further details of ```localStorage``` at [mdn web docs](https://developer.mozilla.org/en-US/), [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).

I learned about working with textareas from [TutorialRepublic](https://www.tutorialrepublic.com/), [How to get the value of a textarea in jQuery](https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-a-textarea-in-jquery.php).


## License

Please refer to the LICENSE in the repo.

---
