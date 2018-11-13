import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Home from './views/Home'
import './App.css';

class App extends Component {
  render() {
    return (
      <Route exact path="/" component={ Home } />
    )
  }
}

export default App
