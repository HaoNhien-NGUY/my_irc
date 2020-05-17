import React, { useState } from 'react';

function ChatInput(props) {

  const [userInput, setuserInput] = useState('');

  const handleChange = (event) => {
    setuserInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleMessage(userInput);
    setuserInput('');
  }

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
          <input type="text" className="form-control" autoComplete="off" value={userInput} onChange={handleChange} />
          <button type="submit" className="btn btn-outline-primary mt-4">Send</button>
      </form>
    </div>
  );
}

export default ChatInput;