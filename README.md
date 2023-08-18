# Time-Tracker
Sometimes you want to keep track of time you spend doing something, let's say, I want to study right now and I want to study for 6 hours throughout the day with proper distributions,

One way to track it all is to note down all the times you sat down and left the seat (inconvenient)

Another way is to start a stopwatch but the stopwatch induces an urgency with it's rapidly changing numbers, I just feel anxious rather than motivated (inconvenient)

## Time Tracker

Hence, I create a simple app which makes this task way easier, whenever you sit down, just press start, and when you leave, just press stop.

Through login system integrated, you can operate it in multiple devices. At the end of the day, you can know how long you sat down for throughout the day.

*Personally, I created this because I felt the need of something like this during my internship.
I was supposed to work for certain period of time, but I always forgot when I signed out for lunch or tea breaks and all that which made me either sit for longer durations or shorter durations,
hence, I created this.
Now, I can keep track of time with just a click of a button.*

## Technologies Used:

### Frontend:
- React for the major frontend
- axios for API calling
- mui/material for prebuilt buttons
- react-redux, @redux/toolkit for state management
- localstorage for making state persist
- react-router for routing
- react-toastify for appealing success or failure messages
- formik for user appealing forms
- yup for form validation

### Backend:
- express
- mongodb for database
- jsonwebtoken for maintaining sessions
- nodemon for constant server rendering
- bcrypt for password security
- cors for cross origin resource sharing
- dotenv for environment variables
- morgan for logging out the requests

## Future Scope / Features to follow:
- commenting about the time frames [Done]
- displaying all the time frames data in a sidesection [Done]
- ability to delete tags [Done]
- tagging of the time spent throughout the day and sorting based on that
- visualizing how the day went by analyzing the tags
