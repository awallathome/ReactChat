import { Button, Icon, Modal } from "react-materialize";
import React from "react";

export default () =>
  function deleteroom() {
    var copyText = document.getElementById("#deleteroom");
    copyText.select();
    document.execCommand("Copy");
    alert("Copied the text: " + copyText.value);
  
};



