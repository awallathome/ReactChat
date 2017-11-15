import React, { Component } from "react";
import "./App.css";

const fakeData = [
  {
  id: 1,
  name: "Jan",
  message: "Our quarterly results are in. They were pretty ok... Great job."
},
{
  id: 2,
  name: "Charles",
  message: "Ha! nice!"
},
{
  id: 3,
  name: "Rob",
  message: "Great to hear. Not only did we beat the competitors, but we may have stretched over budget. Oops."
},
{
  id: 4,
  name: "Carol",
  message: "Our safisfaction survey results just came in too. They aren't...terrible."
},
{
  id: 5,
  name: "Jan",
  message: "Too early for a Celebration?"
}];

class App extends Component {
  render() {
    return <div className="App">
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper blue">
              <div className="row">
                <a href="#messageArea" className="brand-logo center" id="logo">
                  <i className="material-icons">forum</i>safeCHAT
                </a>
              </div>
            </div>
          </nav>
        </div>

        <main className="blue lighten-5">
          <div className="row scrollspy hide" id="messageArea">
            <div className="container">
              <div className="container">
                <div className="row">
                  <div className="col s12 grey-text text-darken-2 white bubble" id="messages">
                    <p>"each message"</p>
                    <p>
                      <h6>this.username</h6>this.message
                    </p>
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
                  <div className="col s12 grey-text text-darken-2 white bubble" id="messages">
                    {fakeData.map(data => <p>
                        <h6 key={data.id}>
                          {data.name}
                        </h6>{data.message}
                      </p>)}
                  </div>
                </div>
                <div className="scrollspy" id="marker" />
              </div>
            </div>
          </div>
        </main>

        <footer className="page-footer blue">
          <div className="row blue" id="chat">
            <div className="container">
              <div className="container">
                <form col s12 id="messageForm">
                  <div className="row">
                    <div className="input-field col s11">
                      <input type="text" placeholder="Message" className="white grey-text text-darken-2 bubble" id="message" />
                    </div>
                    <div className="col s1 center">
                      <a href="#marker">
                        <i className="material-icons yellow blue-text small hoverable circle" id="sendMessage">
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
      </div>;
  }
}

export default App;

