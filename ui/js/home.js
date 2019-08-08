import { ipcRenderer, ipcMain } from 'electron';

const client = ipcRenderer;

const select = document.querySelector.bind(document);

const check =_=> {
  const {path} = select('.file').files[0];
  client.send('videoFile', path);
}
const selected = select('.file').addEventListener('change', check)