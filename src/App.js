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
      allQuotes: [],
    };
  }

  handleNameChange = (event) => {
    this.setState({speaker: event.target.value});
  }

  handleQuoteChange = (event) => {
    this.setState({quote: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert('A quote was submitted: ' + this.state.speaker + ' said: ' + '"' + this.state.quote + '" on: ' + this.state.date);
    fetch("http://localhost:8000/notes", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        "speaker": this.state.speaker, 
        "quote": this.state.quote, 
        "date": this.state.date
      })
    })
  }

fetchAll = (event) => {
  fetch("http://localhost:8000/notes")
  .then(res => res.json())
  .then((result) => {
    this.setState({allQuotes: []})
    this.setState({allQuotes: result})
  })
  event.preventDefault();
}

  componentDidMount = () => {
    this.setState({isLoaded: true});
  }

  render() {
    const { error, isLoaded, allQuotes, speaker, quote } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading....</div>;
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Name<input type="text" value={speaker} onChange={this.handleNameChange} /></label>
            <label>Quote<input value={quote} onChange={this.handleQuoteChange} /></label>
            <input type="submit" />
          </form>  
          <button onClick={this.fetchAll}>Get all</button>
          <ul>
            {
              (allQuotes.length)
                ? allQuotes.map(data => (
                    <li key={data._id}>{data.speaker} said: {data.quote}</li>
                  ))
                : null   
            }
          </ul>  
        </div>  
      );
    }
  }

}

export default App;
