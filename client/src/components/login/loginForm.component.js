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
    <div className="login-form pt-3">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Enter your username" className="form-control" style={{ fontSize: '20px', borderColor: '#7289da' }} id="usernameInput" autoComplete="off" value={username} onChange={handleChange} />
          {props.error.error && <small className="form-text text-danger">{props.error.message}</small>}
          <button type="submit" className="btn btn-outline-primary mt-3" style={{ borderColor: '#7289da', color: '#7289da' }}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;