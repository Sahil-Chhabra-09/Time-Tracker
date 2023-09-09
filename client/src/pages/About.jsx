import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "../customStyles/About.css";
import RenderNavbar from "../components/RenderNavbar";

const markdownContent = `
It is very important to keep track of what you do throughout the day as paying attention to what you do is the first step to readjust habits,

let's say, I want to study right now and I want to study 3 different subjects for 2 hours each throughout the day with proper distributions,
along with that, I want to track how much time I use my phone, how much time I lay in bed, etc.

One way to track it all is to note down all the times you sat down and left the seat (inconvenient)

Another way is to start a stopwatch but the stopwatch induces an urgency with its rapidly changing numbers, I just feel anxious rather than motivated (inconvenient)

## Time Tracker



Hence, I created a simple app which makes this task way easier

Just create the goal of *topic : duration*,

whenever you sit down, just press start, and when you leave, just press pause, then you can simply tag it and the app will take care of it, it will keep track of your goal as well as your timeline.

Through the login system integrated, you can operate it on multiple devices. At the end of the day, you can track how much time you spend on various things on daily basis.

### Working:
- Create your goals in the "My Goals" tab
- Then you just start tracking your time through start/pause
- After you are done with a particular thing you can tag it and it get's added to your timeline
- Now, in the goals tab, if you had goals with the same tag name, it automatically updates the completion of goal
- [Keep in mind, tags are case sensitive]

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
- react-onClickOutside for UI enhancements

### Backend:
- express
- mongodb for database
- jsonwebtoken for maintaining sessions
- nodemon for constant server rendering
- bcrypt for password security
- cors for cross-origin resource sharing
- dotenv for environment variables
- morgan for logging out the requests

## Future Scope / Features to follow:
- commenting about the time frames [Done]
- displaying all the time frames data in a side section [Done]
- ability to delete tags [Done]
- Add goals functionality for tags [Done]
- sorting based on tags
- visualizing how the day went by analyzing the tags
- ability to edit a tag name
- reports of how you did overall
`;

function About() {
  return (
    <div id="blur">
      <RenderNavbar />
      <div className="h-screen flex justify-center flex-col pt-10">
        <div
          className="mx-24 overflow-y-scroll shadow-lg shadow-slate-300 rounded-md  text-white "
          style={{ height: "80vh" }}
        >
          <div class="markdown-container">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
