import React, { Component } from "react";
import { Button, Modal } from "react-materialize";
  
class ProceedToChat extends Component {

  state = {
    isOpen: true 
  }
    
  render() {
    return (
      <div id="introModal">
        <Modal header="Welcome to On the Fly" >
                      
          <p>You will need a name for your session. </p>
          <p>Toggle between real and decoy conversations with the 'esc' key</p>
          <p>or by tapping on the Logo.</p>
        
          <form className="form-inline"/>
              
              <div className="form-group">
                <input type="text" className="form-control" id="username" placeholder="Any name will do!" />
              </div>

              <div className="modal-footer">
                <Button id="chat" type="button" className="btn btn-default" data-dismiss="modal" onclick={this.setState({ username: "#username"})}>Start Talking</Button>  
              </div>

          <form/>

        </Modal>
      </div>
    )
  }
}

export default ProceedToChat; 