import React from "react";

// Toggle Convos
class ToggleMessage extends React.component {
  render() {
      return(
        document.addEventListener("keydown", function(e) {
        const key = e.keyCode ? e.keyCode : e.which;
        
        if (key === 27) {
          
        // if (($("#messageArea2").hasClass("hide")) && !($("#messageArea").hasClass("hide"))) {
        //     $('#messageArea2').removeClass("hide");
        //     $('#messageArea').addClass("hide");
        // } else {
        //     $('#messageArea2').addClass("hide");
        //     $('#messageArea').removeClass("hide");
        // }
        }
        })
      );
  }
}

export default ToggleMessage;