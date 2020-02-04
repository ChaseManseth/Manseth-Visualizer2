// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/').then(response => {
      this.setState({ data: response.data });
    }).catch(err => console.log(err));
  }
  render() {
    if(this.state.data === null) {
      return (
        <div>Hello World PP</div>
      );
    } else {
      return (
        <div>{this.state.data}</div>
      );
    }
    
  }
}

export default App;