// NB: The code in this file is currently unused. It was originally intended for a future feature of moving conversation to a differnt room. 

//We employ certain elements from a react-specific styling of Materialize.css

import { Button, Icon, Modal } from "react-materialize";
import React from "react";

export default () =>
  function deleteroom() {
    var copyText = document.getElementById("#deleteroom");
    copyText.select();
    document.execCommand("Copy");
    alert("Copied the text: " + copyText.value);
  
};
