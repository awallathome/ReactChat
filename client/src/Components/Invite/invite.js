
import { Button, Icon, Modal } from "react-materialize";
import React from "react";

export default () =>
  function roomLink() {
    var copyText = document.getElementById("#roomLink");
    copyText.select();
    document.execCommand("Copy");
    alert("Copied the text: " + copyText.value);
  
};

