// ws in node js 
import { WebSocketServer } from 'ws'; // npm i @types/ws
import { GameManager } from './GameManager';

const gameManager = new GameManager();

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);
    ws.on('disconnect' , ()=>gameManager.removeUser(ws))

  ws.on('error', console.error);


  ws.on('message', function message(data) { 
    console.log('received: %s', data);
  });

  ws.send('something');
});