import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './views/Home'
import CategoryPage from './views/CategoryPage'
import PostPage from './views/PostPage'
import CreatePost from './views/CreatePost'
import EditPost from './views/EditPost'
import { fetchPosts } from './components/post/actions'
import './App.css'

class App extends Component {
  componentDidMount() {
    !this.props.posts.allIds.length && this.props.fetchPosts()
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/post/create" component={ CreatePost } />
        <Route exact path="/post/edit/:postId" component={ EditPost } />
        <Route exact path="/:category" render={ ( props ) => (
          <CategoryPage key={ props.match.params.category } { ...props }/>
        ) } />
        <Route exact path="/:category/:postId" component={ PostPage } />
      </Switch>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch( fetchPosts() ),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
