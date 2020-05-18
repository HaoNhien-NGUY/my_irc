import React, { useState } from 'react';

function LoginForm(props) {

  const [username, setUsername] = useState('');

  const handleChange = (event) => {
    setUsername(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleUsername(username);
    setUsername('');
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usernameInput" className="ml-1 mb-2">Enter your username</label>
          <input type="text" className="form-control" style={{fontSize:'20px'}} id="usernameInput" autoComplete="off" value={username} onChange={handleChange} />
          <small id="emailHelp" className="form-text text-muted ml-1">Your username will be seen by everyone.</small>
          <button type="submit" className="btn btn-outline-primary mt-4">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;