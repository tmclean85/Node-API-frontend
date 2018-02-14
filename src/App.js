import React, { Component } from 'react';
import './App.css';
var moment = require('moment');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //TODO: error case work
      error: null,
      isLoaded: false,
      speaker: '',
      quote: '',
      //TODO: format date
      date: moment().format('MMMM Do YYYY'),
      allQuotes: [],
      queryQuotes: [],
      speakerQuery: '',
    };
  }
  
  //store speaker input value in local state when called
  handleNameChange = (event) => {
    this.setState({speaker: event.target.value});
  }

  //store quote input value in local state when called
  handleQuoteChange = (event) => {
    this.setState({quote: event.target.value});
  }

  //store speaker query input value in local state when called
  handleSpeakerQueryChange = (event, speaker) => {
    this.setState({speakerQuery: event.target.value});
  }

  //when the form is submitted, alert the post body and send the post request via fetch
  handleSubmit = (event) => {
    event.preventDefault();
    alert('A quote was submitted: ' + this.state.speaker + ' said: ' + '"' + this.state.quote + '" on: ' + this.state.date);
    fetch("http://localhost:8000/notes", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
      //populate the post body with form data stored in local state
        "speaker": this.state.speaker, 
        "quote": this.state.quote, 
        "date": this.state.date
      })
    })
  }

  //fetches all documents from the notes collection
  fetchAll = () => {
    fetch("http://localhost:8000/notes")
    .then(res => res.json())
    .then((result) => {
    //resets the arrays in local state which are used to store documents from this collection
      this.setState({queryQuotes: [], allQuotes: []})
    //then stores the server response json in an array in local state  
      this.setState({allQuotes: result})
    })
  }
  
  //fetches documents from the notes collection where speaker matches query form data 
  fetchBySpeaker = (event) => {
    var speaker = this.state.speakerQuery;
    fetch("http://localhost:8000/notes?speaker=" + speaker)
    .then(res => res.json())
    .then((result) => {
    //resets the arrays in local state which are used to store documents from this collection
      this.setState({queryQuotes: [], allQuotes: []})
    //then stores the server response json in an array in local state 
      this.setState({queryQuotes: result})
    })
    event.preventDefault();
  }
  
  //delete document
  handleDelete = (event) => {
    //send delete request with objectId of indicated document
    fetch("http://localhost:8000/notes/" + event.target.value, { method: "DELETE" })
    .then(res => console.log(res))
    //fire fetchAll method to repopulate list 
    .then(this.fetchAll);
    event.preventDefault();
  }


  componentDidMount = () => {
    this.setState({isLoaded: true});
    this.fetchAll();
  }

  render() {
    const { error, isLoaded, allQuotes, speaker, quote, speakerQuery, queryQuotes } = this.state;
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
          <form onSubmit={this.fetchBySpeaker}>
            <label>Query name<input value={speakerQuery} onChange={this.handleSpeakerQueryChange} /></label>
            <input type="submit" />
          </form>
          <ul>
            {
              //if there is a speaker query stored in local state, map the array of documents where the speaker matches the query
              (queryQuotes.length)
                ? queryQuotes.map(data => (
                    <li key={data._id}>
                      {data.speaker} said: {data.quote} on {data.date}
                      <button onClick={this.handleDelete} value={data._id}>delete</button>
                    </li>
                  ))
                //else map the entire collection
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
