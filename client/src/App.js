import React, { useState, useEffect } from 'react';
import './App.css';
import LoginIndex from './components/login/loginIndex.component';
import socket, { userLogin, userInfoListner } from './socketAPI';
import ChatLobby from './components/chatLobby/chatLobby.component';

function App() {
  const [user, setUser] = useState(false);
  const [error, setError] = useState(false);
  //user = { username: 'golfy', id: socket.id } ;

  //listen to username form server

  useEffect(() => {
    function userInfoFN(userData) {
      if (userData.username) {
        setUser(userData);
        setError(false);
      } else {
        setError(userData);
      }
    }
    userInfoListner(userInfoFN);

    return function cleanup() {
      socket.removeListener('userInfo', userInfoFN);
    };
  }, []);

  const loginHanddle = (username) => {
    // setUser(username);
    userLogin(username);
  }

  return (
    <div>
      {user ? <ChatLobby user={user} /> : <LoginIndex loginHanddle={loginHanddle} error={error}/>}
    </div>
  );
}

export default App;