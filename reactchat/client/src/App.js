import React, { Component } from "react";
import "./App.css";
// import ToggleMessage from "./App.test.js";

const fakeData = [
  {
  id: 1,
  name: "Jill",
  message: "User result came in. They were decent."
},
{
  id: 2,
  name: "Charles",
  message: "Ha! nice!"
},
{
  id: 3,
  name: "Rob",
  message: "Great to hear. We beat the competitors, but we also blew the budget. Oops."
},
{
  id: 4,
  name: "Carol",
  message: "Our safisfaction survey results just came in too. They aren't...terrible."
},
{
  id: 5,
  name: "Jen",
  message: "Too early for a Celebration?"
}];

class App extends Component {

  handleHideKeyPress = e => {
      const key = e.keyCode;
      if (key === 27) {
        console.log("escape key");
      }
    };

  componentDidMount() {
    document.addEventListener("keydown", this.handleHideKeyPress);
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleHideKeyPress);
  };

  render() {
    return (
      <div className="App">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper blue-grey">
              <div className="row">
                <a href="#messageArea" className="brand-logo center" id="logo">
                  <i className="material-icons">forum</i>Confyd
                </a>
              </div>
            </div>
          </nav>
        </div>

        <main className="#9e9e9e grey">
          <div className="row scrollspy hide" id="messageArea">
            <div className="container">
              <div className="container">
                <div className="row">
                  <div
                    className="col s12 grey-text text-darken-2 white bubble"
                    id="messages"
                  >
                    {/*<p>{ToggleMessage}</p>*/}
                    <div style={{ padding: 10 }}>
                      <h6>this.username</h6>this.message
                    </div>
                    <p>each</p>
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
                  <div
                    className="col s12 black-text text-darken-2 white bubble"
                    id="messages"
                  >
                    {fakeData.map(data => (
                      <div style={{ padding: 10 }} key={data.id}>
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
                      <input
                        type="text"
                        placeholder="Message"
                        className="white grey-text text-darken-2 bubble"
                        id="message"
                      />
                    </div>
                    <div className="col s1 center">
                      <a href="#marker">
                        <i
                          className="material-icons yellow blue-text small hoverable circle"
                          id="sendMessage"
                        >
                          arrow_upward
                        </i>
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;

