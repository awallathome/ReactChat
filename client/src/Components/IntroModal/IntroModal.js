import React, { Component } from "react";
import { Button } from "react-materialize";
import Modal from "react-modal";
  
class ProceedToChat extends Component {

  render() {
    return <div id="introModal">
        <Modal isOpen={this.props.close}>
          <p>You will need a name for your session. </p>
          <p>
            Toggle between real and decoy conversations with the 'esc' key
          </p>
          <p>or by tapping on the Logo.</p>

          <form className="form-inline" />

          <div className="form-group">
            <input type="text" className="form-control" id="userName" placeholder="Any name will do!" onChange={this.props.handleInputChange} value={this.props.userName}/>
          </div>

          <div className="modal-footer">
            <Button id="chat" type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.sendValue} >
              Start Talking
            </Button>
          </div>

          <form />
        </Modal>
      </div>;
  }
}

export default ProceedToChat; 