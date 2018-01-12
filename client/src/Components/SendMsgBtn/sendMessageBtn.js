// We are employing the Component.state feature from react which helps us handle different events. 
import React, { Component } from "react";

//For the send button, instead of using jQuery, we are styling the hover color through this.state to change as isHovered changes from true to false. Ideally, this will be cleaner if styled in App.css. 
class SendMessageBtn extends Component {
  state = {
    isHovered: false
  }

  renderColor = () => {
    const { isHovered } = this.state;

    if (isHovered) {
      return "orange white-text";
    } else {
      return "white blue-grey-text";
    }
  }
//the SendMessageBtn element is styled here and rendered as an <button> object when imported into the App.js file
  render() {
    return <button onMouseEnter={() => this.setState({
            isHovered: true
          })} onMouseLeave={() => this.setState({
            isHovered: false
          })} style={{ background: "transparent", border: "none" }} href="#marker" onClick={this.props.handleFormSubmit}>
        <i
          className={`material-icons ${this.renderColor()} small hoverable circle`} 
     
          id="sendMessage"
        >
          arrow_drop_up
        </i>
      </button>;
  }
}
//We export the SendMessageBtn that we created above for use within App.js
export default SendMessageBtn;