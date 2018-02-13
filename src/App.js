import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      speaker: '',
      quote: '',
      date: new Date(),
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleQuoteChange = this.handleQuoteChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange = (event) => {
    this.setState({speaker: event.target.value});
  }

  handleQuoteChange = (event) => {
    this.setState({quote: event.target.value});
  }

  handleSubmit = (event) => {
    alert('A quote was submitted: ' + this.state.speaker + ' said: ' + '"' + this.state.quote + '" on: ' + this.state.date);
    fetch("http://localhost:8000/notes", {
      method: 'POST', 
      'Accept': 'application/json, text/plain, */*', 
      'Content-Type': 'application/json', 
      body: {
        speaker: 'Cody Hardman', 
        quote: 'Damn it feels good to be hard coded', 
        date: 'yolo'
      }
    })
    event.preventDefault();
  }

  componentDidMount = () => {
    this.setState({isLoaded: true});
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading....</div>;
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>Name<input type="text" value={this.state.speaker} onChange={this.handleNameChange} /></label>
          <label>Quote<input value={this.state.quote} onChange={this.handleQuoteChange} /></label>
          <input type="submit" />
        </form>  
      );
    }
  }
}

export default App;
