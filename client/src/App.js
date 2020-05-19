import React, { useState } from 'react';
import './App.css';
import LoginIndex from './components/login/loginIndex.component';
import {userLogin} from './socketAPI';
import ChatLobby from './components/chatLobby/chatLobby.component';

function App() {
  const [username, setUsername] = useState(false);

  const loginHanddle = (username) => {
    setUsername(username);
    userLogin(username);
  }

  return (
    <div>
      {username ? <ChatLobby username={username} /> : <LoginIndex loginHanddle={loginHanddle} />}
    </div>
  );
}

export default App;