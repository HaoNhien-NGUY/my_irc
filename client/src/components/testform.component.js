import React, { Component } from 'react';
import io from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:4242";

class Testform extends Component {
  constructor(props) {
    super(props);
    const socket = io(ENDPOINT);
    
    this.state = { 
      value: '',
    };


    // socket.on('message', msg => {
    //   console.log(msg);
    // });
  }

  handleChange = (event) => { this.setState({ value: event.target.value }); }

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.socket.emit('message', this.state.value);
    this.setState({value : ""});
  }

  render() {
    console.log('fuck my ass');

    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
          <label>Message : </label>
          <input type="text" name="message" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Envoyer" />
        </form>
      </div>
    );
  }
}

export default Testform;
