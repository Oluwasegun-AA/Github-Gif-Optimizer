import { ipcRenderer } from 'electron';

const client = ipcRenderer;

const select = document.querySelector.bind(document);

const check =_=> {
  const {path} = select('.file').files[0];
  client.send('videoFile', path);
}

const display = (event, data)=>{
  select('#display').innerHTML = `the video duration is ${data} seconds`;
}
const selected = select('#info').addEventListener('click', check)
client.on('videoDuration', (event, data)=>display(event, data))