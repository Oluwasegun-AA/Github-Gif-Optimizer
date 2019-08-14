import { ipcRenderer } from 'electron';

const client = ipcRenderer;

const select = document.querySelector.bind(document);

const exitWindow =()=>{
  client.send('exit');
}

const exitButton = select('.exitBtn');
exitButton.addEventListener('click', exitWindow);
