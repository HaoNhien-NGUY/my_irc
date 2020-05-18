import React, { useState } from 'react';
import './App.css';
import LoginIndex from './components/login/loginIndex.component';
import {userLogin} from './socketAPI';
import ChatRoom from './components/chatLobby/chatRoom.component';

function App() {
  const [username, setUsername] = useState(false);

  const loginHanddle = (username) => {
    setUsername(username);
    userLogin(username);
  }

  return (
    <div>
      {username ? <ChatRoom username={username} /> : <LoginIndex loginHanddle={loginHanddle} />}
    </div>
  );
}

export default App;