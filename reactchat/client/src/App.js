import React, { Component } from "react";
import "./App.css";

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

const realData = [
  {
    id: 1,
    name: "Jill",
    message: "User result came in. They were decent."
  },
  {
    id: 2,
    name: "Real",
    message: "Data"
  },
  {
    id: 3,
    name: "Real",
    message:
      "Stuff"
  },
  {
    id: 4,
    name: "Carol",
    message:
      "Our safisfaction survey results just came in too. They aren't...terrible."
  },
  {
    id: 5,
    name: "Jen",
    message: "Too early for a Celebration?"
  }
];

class App extends Component {

  state = {
    data: fakeData,
    isReal: false,
    message: ""
  };

  handleHideKeyPress = e => {
      const key = e.keyCode;
      if (key === 27) {
        if (this.state.isReal) {
          this.setState({ data: fakeData, isReal: false});
        } else { 
          this.setState({ data: realData, isReal: true });
        }
        
      }
    };

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.getAttribute("id");

    this.setState({ [name] : value });

  }

  handleFormSubmit = e => {
    e.preventDefault();
    const newData = this.state.data.concat({id: this.state.data.length + 1, name: "Adam", message: this.state.message });

    this.setState({ data: newData });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleHideKeyPress);
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleHideKeyPress);
  };

  render() {
    return <div className="App">
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
                  <div className="col s12 grey-text text-darken-2 white bubble" id="messages">
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
                  <div className="col s12 black-text text-darken-2 white bubble" id="messages">
                    {this.state.data.map(data => (
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
                      <input type="text" placeholder="Message" className="white grey-text text-darken-2 bubble" id="message" value={this.state.message} onChange={this.handleInputChange} />
                    </div>
                    <div className="col s1 center">
                      <a href="#marker" onClick={this.handleFormSubmit}>
                        <i className="material-icons white blue-text small hoverable circle" id="sendMessage">
                          arrow_drop_up
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

