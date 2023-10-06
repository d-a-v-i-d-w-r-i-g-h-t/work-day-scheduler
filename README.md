# Work Day Scheduler

## Description 

Your GitHub profile is an extremely important aspect of your public identity as a developer. A well-crafted one allows you to show off your work to other developers as well as potential employers. An important component of your GitHub profile—and one that many new developers often overlook—is the README.md file.

The quality of a README often differentiates a good project from a bad project. A good one takes advantage of the opportunity to explain and showcase what your application does, justify the technologies used, and even talk about some of the challenges you faced and features you hope to implement in the future. A good README helps you stand out among the large crowd of developers putting their work on GitHub.

There's no one right way to structure a good README. There is one very wrong way, however, and that is to not include a README at all or to create a very anemic one. This guide outlines a few best practices. As you progress in your career, you will develop your own ideas about what makes a good README.

At a minimum, your project README needs a title and a short description explaining the what, why, and how. What was your motivation? Why did you build this project? (Note: The answer is not "Because it was a homework assignment.") What problem does it solve? What did you learn? What makes your project stand out? 



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
