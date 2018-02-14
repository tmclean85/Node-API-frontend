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
      queryQuotes: [],
      speakerQuery: '',
      deleteId: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({speaker: event.target.value});
  }

  handleQuoteChange = (event) => {
    this.setState({quote: event.target.value});
  }

  handleSpeakerQueryChange = (event, speaker) => {
    this.setState({speakerQuery: event.target.value});
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
    this.setState({queryQuotes: [], allQuotes: []})
    this.setState({allQuotes: result})
  })
  event.preventDefault();
}

fetchBySpeaker = (event) => {
  var speaker = this.state.speakerQuery;
  fetch("http://localhost:8000/notes?speaker=" + speaker)
  .then(res => res.json())
  .then((result) => {
    this.setState({queryQuotes: [], allQuotes: []})
    this.setState({queryQuotes: result})
  })
  event.preventDefault();
}

handleDelete = (event) => {
  this.setState({deleteId: event.target.value});
  var quoteId = this.state.deleteId;
  if(quoteId) {
    fetch("http://localhost:8000/notes/" + quoteId, {
      method: "DELETE"
    })
    .then(res => console.log(res));
  }
  event.preventDefault();
}


  componentDidMount = () => {
    this.setState({isLoaded: true});
  }

  render() {
    const { error, isLoaded, allQuotes, speaker, quote, speakerQuery, queryQuotes, deleteId } = this.state;
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
          <form onSubmit={this.fetchBySpeaker}>
            <label>Query name<input value={speakerQuery} onChange={this.handleSpeakerQueryChange} /></label>
            <input type="submit" />
          </form>  
          <ul>
            {
              (queryQuotes.length)
                ? queryQuotes.map(data => (
                    <li key={data._id}>
                      {data.speaker} said: {data.quote} on {data.date}
                      <button onClick={this.handleDelete} value={data._id}>delete</button>
                    </li>
                  ))
                : allQuotes.map(data => (
                    <li key={data._id}>
                      {data.speaker} said: {data.quote} on {data.date} 
                      <button onClick={this.handleDelete} value={data._id}>delete</button>
                    </li>
                  ))
            }
          </ul>  
        </div>  
      );
    }
  }

}

export default App;
