import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPosts } from './actions'

class ListPosts extends Component {
  componentDidMount() {
    !this.props.posts.items.length && this.props.fetchPosts()
  }

  render() {
    const { posts } = this.props
    let content = ''
    if ( posts.items.length ) {
      content = (
         <ul>
          { posts.items.map( post => (
            <li key={post.id}>{ post.title }</li>
          ))}
        </ul>
      )
    }
    return (
      <div className="App">
        { content }
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
