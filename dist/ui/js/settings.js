"use strict";

var _electron = require("electron");

const client = _electron.ipcRenderer;
const select = document.querySelector.bind(document);

const exitWindow = () => {
  client.send('exit');
};

const exitButton = select('.exitBtn');
exitButton.addEventListener('click', exitWindow);