import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {

    // var myFetch = {
    //   'method': 'GET',
    //   headers: {
    //     'Origin': 'http://localhost:8000',
    //   },
    //   mode: 'cors',
    //   body: JSON.stringify({speaker: 'Randy', quote: 'fuck the police', date: '2 Feb 2018'})
    // };

    // fetch("http://localhost:8000/notes", myFetch)
    // .then(res => res.json())
    // .then(
    //   (result) => {
    //     console.log(result);
    //     this.setState({
    //       isLoaded: true,
    //       items: result.items
    //     });
    //   },
    //   (error) => {
    //     this.setState({
    //       isLoaded: true,
    //       error
    //     });
    //   }
    // )

  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading....</div>;
    } else {
      return (
        <h1>dis app</h1>
      );
    }
  }
}

export default App;
