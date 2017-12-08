import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Button, Icon, Modal } from "react-materialize";

const fakeData = [
  {
    _id: 1,
    name: "Jill",
    message: "User result came in. They were decent."
  },
  {
    _id: 2,
    name: "Charles",
    message: "Ha! nice!"
  },
  {
    _id: 3,
    name: "Rob",
    message:
      "Great to hear. We beat the competitors, but we also blew the budget. Oops."
  },
  {
    _id: 4,
    name: "Carol",
    message:
      "Our safisfaction survey results just came in too. They aren't...terrible."
  },
  {
    _id: 5,
    name: "Jen",
    message: "Let's try Rob's suggestion..."
  },
  {
    _id: 6,
    name: "Carol",
    message: "I like that. Are there other ideas to consider?"
  }
];

class App extends Component {
  state = {
    data: fakeData,
    isReal: false,
    userName: "",
    message: ""
  };

  handleHideKeyPress = e => {
    const key = e.keyCode;
    if (key === 27) {
      e.preventDefault();
      if (this.state.isReal) {
        this.setState({ data: fakeData, isReal: false });
      } else {
        this.setState({ isReal: true }, this.getMessages);
      }
    }
  };

  handleLogoClick = e => {
    if (this.state.isReal) {
      this.setState({ data: fakeData, isReal: false });
    } else {
      this.setState({ isReal: true }, this.getMessages);
    }
  };

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.getAttribute("id");
    this.setState({ [name]: value });
  };

  getMessages = () => {
    axios
      .get("api/messages?room=" + this.props.match.params.id)
      .then(response =>
        this.setState({ data: response.data }, () => {
          const messageDiv = document.querySelector("#messages");
          console.log(messageDiv);
          messageDiv.scrollTop = messageDiv.scrollHeight;
        })
      );
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.socket.emit("message-server", {
      message: this.state.message,
      room: this.props.match.params.id,
      name: this.state.userName
    });
    this.setState({ message: "" });
  };

  hitEnter = e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.handleFormSubmit();
    }
  };

  componentDidMount() {
    //Here we are asking for any name whatsoever
    this.socket = window.io();
    const roomId = this.props.match.params.id;
    if (!roomId) {
      axios
        .get("api/room")
        .then(res => (window.location.pathname = res.data._id));
    } else {
      this.init(() => {
        let user = prompt(
          "Toggle between decoy and your chat with the <esc> key. \n \n Please enter a name for your session. Any name will do."
        );
        this.setState({ userName: user });
        document.addEventListener("keydown", this.handleHideKeyPress);

        this.socket.emit("room", roomId);
        this.socket.on("message", message => {
          console.log(message);
          if (this.state.isReal) {
            const messageDiv = document.querySelector("#messages");
            console.log(messageDiv);
            messageDiv.scrollTop = messageDiv.scrollHeight;
            const newData = this.state.data.concat(message);
            this.setState({ data: newData });
          }
        });
      }, () => (window.location.pathname = ""));
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleHideKeyPress);
    
  }

  init = (success, error) => {
    return axios
      .get("/api/room/" + this.props.match.params.id)
      .then(success)
      .catch(error);
  };

  // roomLink = () => {
  //   var copyText = document.getElementById("roomLink");
  //   console.log(copyText);
  //   console.log(copyText.value);
  //   copyText.select();
  //   document.execCommand("Copy");
  //   alert("Copied the text: " + copyText.value);
  // };

  render() {
    return <div className="App">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper blue-grey">
              <div className="row">
                <a href="#messageArea" className="brand-logo center" id="logo" onClick={this.handleLogoClick}>
                  <i className="material-icons">security</i>On the Fly
                </a>
                <button id="save">Erase this Chat</button>
                <Modal header="Copy and share this link to invite." trigger={<button id="invite">
                      Invite
                    </button>}>
                  <p>
                    Save this link in order to return to this conversation.
                  </p>
                  <p>
                    {window.location.origin}/{this.props.match.params.id}
                  </p>
                  <input id="roomLink" type="text" style={{ display: "none" }} value={`${window.location.origin}/${this.props.match.params.id}`} />
                  {/*<button onClick={this.roomLink}>Copy Link</button>*/}
                </Modal>
              </div>
            </div>
          </nav>
        </div>

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

        <footer className="page-footer blue-grey">
          <div className="row " id="chat">
            <div className="container">
              <div className="container">
                <form className="col s12" id="messageForm">
                  <div className="row">
                    <div className="input-field col s11">
                      <input type="text" placeholder="Message" className="white grey-text text-darken-2 bubble" id="message" value={this.state.message} onChange={this.handleInputChange} />
                    </div>
                    <div className="col s1 center">
                      <button style={{ background: "transparent", border: "none" }} href="#marker" onClick={this.handleFormSubmit}>
                        <i className="material-icons white blue-text small hoverable circle" id="sendMessage">
                          arrow_drop_up
                        </i>
                      </button>
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

export default App;
