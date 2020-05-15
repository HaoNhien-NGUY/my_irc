import React from 'react';
import './App.css';
import io from 'socket.io-client';
import Testform from './components/testform.component';
const ENDPOINT = "http://127.0.0.1:4242";


function App() {
  const socket = io(ENDPOINT);

  socket.on('message', msg => {
    console.log(msg);
  });

  socket.emit('login', 'golfyazz', 'roomtest');

  return (
    <div className="">
      <h1>okokok</h1>
      {/* <Testform /> */}
    </div>
  );
}

export default App;
