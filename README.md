# ReactChat

12/ 10/ 2018

**CONTENTS**
-INTRODUCTIONS
-DESCRIPTION of On the Fly
-Future Improvements
-The Grand Tour of app code
-Running the application locally

**Introduction**

The ReactChat app (deployed as On the Fly) was created by Adam Wallis (project lead) and Alex Lepore. On the Fly is a basic chat application with subtle features for enabling privacy while also allowing for a smooth integration into one's everyday workflow, whether on a mobile device or desktop interface. On the Fly provides the easiest CRUD platform for establishing collaborative and other group communications without the need for downloads/installs/signups as with other applications. We believe this maximizes the number of people who are able to communicate with each other about time-sensitive matters with little or no advance notice. 

**Description**
  - When you first visit the site, you are assigned a unique room and prompted to enter any name to use during the chat. Chatroom persist at the URL address.Once in the room, users can invite others by clicking the "Invite" button. They are provided a copy/pastable link to their unique chat room. At any time, users can also choose to delete a given conversation from the site, while sustaining the chatroom itself for future use. For conversations involving sensitive topics, a subtle privacy feature may be enabled either by hitting the 'esc' key or by tapping/clicking the On the Fly logo (intended for mobile devices). This feature toggles the view between the actual conversation and a decoy conversation so that no significant screen movements grab the attention of a passerby. 

  - The bulk of the interesting code is located in the 'client > src' and 'config' folders, as well as the server.js file. When writing the App.js file, I attempted to make the flow demonstrate the general order of events and features one encounters with the app. 
    --The fakeData JSON object renders showing what a conversation will look like. 

    --The App class contains all that follows: Component.state hold properties that changes and directs the rendering data (real or fake) depending on the boolean value of isReal).

    --The following functions are all created inside of App and are access by JavaScript's 'this' method (e.g. this.setState, this.handlFormSubmit, etc.). 

    --React's render() function, in a practical sense, sends one large object with many interchangeable parts. These parts are typically denoted by appearing inside {curly braces}. 

  - NB: a previous scaled-down version of this app was built by a team (Adam Wallis -project lead, Alan Kemsley, and Georgi Nenov) in Handlebars and was rebuilt and improved in full in React. In the process of transferring and rebuilding component parts, some lines of orphaned code may be sprinkled throughout that are not in presently use. 

**Future Improvements**
  - Automatic delete:  To increase privacy, an ideal version of the app would erase the conversation from Mongo upon the last person exiting the chatroom. To do this, I need to add a counter somewhere in the back end for tracking the number of people in the room. This is a more advanced feature for socket.io than time allowed, so this feature was put on hold. It will require, among other things, an additional database for each room that keeps track of current users. 

  - Current Users: When a room counter has been added, I would also like to render a list of current users online in the room. 

  - Authentication: Currently, all authentication is handled by the unique room ID. I plan to develop a basic room password option for entering a room through the direct link. 

  - Moving the conversation: In a situation where a room's link may become public, I am working on ways to move the conversation in full from one room to another. The benefit is to avoid losing the entire conversation while also keeping the chatroom private. 

**The Grand Tour** 
  1- *ReactChat > client > public > index.html*
    - The app is built in ES6 and ReactJS, which dynamically populates (and repopulates) information in the view without reloading the page or navigating to different html pages. In our app, the index.html page displays the basic html layout, links to stylesheets, js scripts, React CDN, materialize, and other  dependencies just before the closing </head> tag. 

    - All renderable app-related data is sent to a <div id="root"> element (line 30) inside the <body> element to which the app will send data from components, routes, apis, and other functions. 

  2- *client > build*
    - DO NOT EDIT this folder... 
    - When building a React app with React's basic folder structure (running 'create react app' in tjhe terminal), it creates a build folder with a default intsructions to run webpack. When doing so, it creates a copied and compiled version of the entire application which should be left alone. 

  3- *client > node_modules*
    - Just don't touch this folder either... 
    - All of the dependencies for the app (such as Mongoose for handling MongoDB CRUD commands, express for handling routing,socket.io for the realtime data exchange...) entail downloading node packages. They are stored here and are also not to be touched. 

  4- *client > src*
    - Most of the major functions are inside this folder, include the App.js file, which contains the basic operative function and logic of the app. The index.js file connects to React and React routers to update the DOM, and the index.css clears out some basic styling for other files. 
    
    - App.css contains code and styling for anything that renders. It includes media queries for a Responsive Design format that keeps the code readable, usable, and uncongested on a mobile devices and smaller screens.

    - registerServiceWorker.js XXXXXXXXXXXXXXXXXXXXX
   
  5- *client > src > Components*
    - The Components > messages > messages.js file contains the messageModel functions (written in Mongoose) for read/create/destroy calls to the MongoDB. These functions are accessed and called through messageModel function inside config > io.js. 

    - The Components > Routes > routes.js file defines what the URL will display for the to two main routes for the app. One is the default route for landing on the page and the other is the route for retrieving the db entries through the .get request. 

    - The Components > Savs > save.js file shows a currently unused function for moving the conversation to a different room (for example, if someone was invited by accident or otherwise accessed the unique URL of the room).

    - The Components > rooms.js file contains code for socket.io to connect and use the .emit (broadcasts/sends a message to all users)and .on (listener for  messages from other users in this room) functions.

    - The Components > sendMessageBtn.js file passes the 'send' button, along with Materialize styling, to the React render()function. The entire sendMessageBtn function is exported through the SendMessageBtn export. 

  6- *ReactChat > config* 
    - The config > io.js file defines what we want from socket.io when we initially connect. In this case, we are wanting both the unique id to the room, we want to assign the user to that room, and to use it for conversations. We also define functions to send and listen for messages. 

    - The config > message.js file contains code that creates a DB for messages and establishes the schema for storing messages in MongoDB. Here, each message has a name (for the user), message (the text that's sent), a datestamp (for use in future development), and a room (to save it to the correct conversation in MongoDB). 

    - The config > room.js file creates a DB for each room and establishes the schema for storing rooms in MongoDB. Here, each message has a unique id and a timestamp. (This code is partially intended for future development of a feature that tracks users who are currently using a room.)

  7- *ReactChat > routes*
    - The routes > api > index.js file tells express that we want to use the neighboring file's route functions in tandem with express route handling.

    - The config > api > message.js file defines the particular routes to which each function is directed. 

    - The config > index.js file contains instructions for what to do if an incorrect route has been hit. 

  8- *server.js*
    - The server.js file establishes the server connection, connects to MongoDB with Mongoose and is the starting point for communicating which functions to run at different times when starting the application. 

      -It establishes that the default route includes a unique room and creates a database for the conversations in it. When clicking on a link to a room, it contains the chatroom ID which tells the route to run a get request for all messages that exist in the room.
   
      -It also runs certain console.log functions to alert for connection/disconnection to/from socket.io.

  9- *yarn.lock, package.json, nodemon.json, Procfile*
    - These files are installed when using React, various npm packages (e.g. express, mongoose), and nodemon. They are best left unbothered. 

  10- *.gitignore* 
    - This file keeps GitHub from loading the node modules packages. This allows for quicker cloning and git pushes. Users will move faster if they download the app without those packages and run a 'npm install' command in the server file. 

**Running the Application Locally**

  1- Open the server.js file in a terminal window and run 'npm install' to add the dependencies.
  2- Open two terminal windows. In one of them first run 'mongod' to initialize MongoDB.
  3- Then in the other terminal windwo run 'yarn start'. The Browser window should open by itself and direct you to localhost 3000 and start running the application.
  4- When closing the application, be sure to 'control' + 'c' in your terminal windows to end the mongod and yarn processes. 

=========================== 
12/ 06/ 2017

Here is SafeChat's 2.0 promised upgrade, to be deployed under the name On the Fly. 

It features the ability to quickly create rooms for confidential team conversations, invite participants, and keep sensitive information under your control. 

