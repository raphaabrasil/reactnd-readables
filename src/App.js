import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './views/Home'
import CategoryPage from './views/CategoryPage'
import PostPage from './views/PostPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/:category" component={ CategoryPage } />
        <Route exact path="/:category/:postId" component={ PostPage } />
      </Switch>
    )
  }
}

export default App
