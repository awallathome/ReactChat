import React, { Component } from "react";

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

export default SendMessageBtn;