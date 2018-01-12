import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Button, Modal } from "react-materialize";
import SendMessageBtn from "./Components/SendMsgBtn/sendMessageBtn";
import fakeData from "./Components/FakeData/fakeData";
import handleLogoClick from "./Components/Toggle/toggle.js";

//Here we employ React's component.state property (by way of state.isReal) to track whethere the conversation that is displayed is the real or decoy converstaion.
class App extends Component {
  state = {
    data: fakeData,
    isReal: false,
    userName: "",
    message: ""
  };

//Here, the esc key (key value 27) will run the below function to determine whether the isReal is set to True or False. If it is false it will set the state to true, and vice versa. 
  handleHideKeyPress = e => {
    const key = e.keyCode;
    if (key === 27) {
      e.preventDefault();
      if (this.state.isReal) {
        this.setState({ data: fakeData, isReal: false });
      } else {
        this.setState({ isReal: true }, this.getMessages);
      };
    }
  };
  
//The same function as above will run if the 'On the Fly' logo is tapped or clicked. This is a feature added specifically so that mobile users can have the same user experience as desktop users. 
  handleLogoClick = e => {
    if (this.state.isReal) {
      this.setState({ data: fakeData, isReal: false });
    } else {
      this.setState({ isReal: true }, this.getMessages);
    }
  };

//Here we are keeping trackof the values inside of any field that can change. In this case, there is only one field that can; the message input field.
  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.getAttribute("id");
    this.setState({ [name]: value });
  };

//The below function will erase the conversation from the database without eliminating the room itself. 
  deleteChat = () =>{
    axios.delete("api/messages", { params: { room: this.props.match.params.id }})
      .then(this.getMessages);
  };

//The below function will read the unique ID from the url for a room and get all existing messages that currently exist. 
  getMessages = () => {
    axios
      .get("api/messages?room=" + this.props.match.params.id)
      .then(response =>
        this.setState({ data: response.data }, () => {
          const messageDiv = document.querySelector("#messages");
        
          messageDiv.scrollTop = messageDiv.scrollHeight;
        })
      );
  };

//When the send button is clicked, the function below executes a socket.emit function to all users that will display for them new messages from other users.
  handleFormSubmit = e => {
    e.preventDefault();
    this.socket.emit("message-server", {
      message: this.state.message,
      room: this.props.match.params.id,
      name: this.state.userName
    });
    this.setState({ message: "" });
  };

//The function below allows for the enter key to send a message as well.
  hitEnter = e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.handleFormSubmit();
    }
  };

  componentDidMount() {
//Here we are asking for any name whatsoever when the application loads. In the current build, there is no extra requirement for autenticaion beyond having access to the specific room by unique URL. 
    this.socket = window.io();
    const roomId = this.props.match.params.id;
    if (!roomId) {
      axios
        .get("api/room")
        .then(res => (window.location.pathname = res.data._id));
    } else {
      this.init(() => {
        let user = prompt(
          "ON THE FLY! \nYou will need a name for your session. Any name will do. \n \nToggle between real and decoy conversations with the <esc> key \nor by tapping on the Logo.\n"
        );
        this.setState({ userName: user });
        document.addEventListener("keydown", this.handleHideKeyPress);

        this.socket.emit("room", roomId);
        this.socket.on("message", message => {
          
          if (this.state.isReal) {
            const messageDiv = document.querySelector("#messages");
            messageDiv.scrollTop = messageDiv.scrollHeight;
            const newData = this.state.data.concat(message);
            this.setState({ data: newData });
          }
        });
      }, () => (window.location.pathname = ""));
    }
  }

//Here we are removing an event listener when it is no longer necessary to track 'this.state'
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleHideKeyPress);
    
  }

  init = (success, error) => {
    return axios
      .get("/api/room/" + this.props.match.params.id)
      .then(success)
      .catch(error);
  };

//All React Applications need a render function as below. What is inside the render function is sent to the 'root' element in the index.html page. 
  render() {
    return <div className="App">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper #263238 blue-grey darken-4">
              <div className="row">
                <a href="#messageArea" className="brand-logo center" id="logo" onClick={this.handleLogoClick}>
                  {/*This is the main page Logo*/}
                  <i className="material-icons">security</i>On the Fly
                </a>
            {/*This is the Delete button followed by the modal that appears when it is clicked.*/}
                <Modal header="Erase all Messages" trigger={<button id="delete">
                Delete Chat</button>}>
                <p>Click 'Confirm' to permantly delete this conversation.<br>
                </br> 
            {/*This is the secondary confirmation button inside the delete modal.*/}
               {<Button onClick={this.deleteChat}>confirm</Button>}
              
            {/*Below is a button for inviting people to the chat room followed by the modal that appears when clicked.*/}
                </p>
                </Modal>
                <Modal header="Copy/share this link to invite." trigger={<button id="invite">
                      Invite
                    </button>}>
                  <p>
                    Save this link in order to return to this conversation.
                  </p>
                  <div id="locationLink">
                    <p>
                      {window.location.origin}/{this.props.match.params.id}
                    </p>
                  </div>
                  <input id="roomLink" type="text" style={{ display: "none" }} defaultValue={`${window.location.origin}/${this.props.match.params.id}`} />
            {/*The button below is currently unused until we decide to add an automated copy/paste option.*/}
            {/*<button onClick={this.roomLink}>Copy Link</button>*/}
                </Modal>
              </div>
            </div>
          </nav>
        </div>

        {/*The message area below displays the realtime conversation.*/}
        <main className="#9e9e9e grey">
          <div className="row scrollspy hide" id="messageArea">
            <div className="container">
              <div className="container">
                <div className="row">
                  <div className="col s12 grey-text text-darken-2 white bubble" id="decoyMessages">
                    {/*<p>{ToggleMessage}</p>*/}
                    <div style={{ padding: 10 }}>
                      <h6>this.username</h6>this.message
                    </div>
                  </div>
                </div>
                <div className="scrollspy" id="marker" />
              </div>
            </div>
          </div>
          {/*The message area below displays the decoy data by mapping through the fakeData object above.*/}
          <div id="messageArea2" className="row scrollspy">
            <div className="container">
              <div className="container">
                <div className="row">
                  <div className="col s12 black-text text-darken-2 white bubble" id="messages">
                    {this.state.data.map(data => (
                      <div key={data._id} style={{ padding: 10 }}>
                        <h6>{data.name}</h6>
                        {data.message}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="scrollspy" id="marker" />
              </div>
            </div>
          </div>
        </main>

        {/*//The footer below holds the message input field as well as the send button. */}
        <footer className="page-footer #263238 blue-grey darken-4">
          <div className="row " id="chat">
            <div className="container">
              <div className="container">
                <form className="col s12" id="messageForm">
                  <div className="row">
                    <div className="input-field col s11">
                      <input type="text" placeholder="Message" className="white grey-text text-darken-2 bubble" id="message" value={this.state.message} onChange={this.handleInputChange} />
                    </div>
                    <div className="col s1 center">
                      {/*The button below is imported as an object from src > Components > sendMessageBtn */}
                      <SendMessageBtn handleFormSubmit={this.handleFormSubmit}/>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </footer>
      </div>;
  }
}

//Below is where we export the entire app from this page (between lines 44 to line 264), which is imported for rendering at one of two routes defined in client > src >  Components > Routes > routes.js.
export default App;