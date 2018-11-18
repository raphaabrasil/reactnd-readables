import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { fetchPosts } from './actions'
import Post from './Post'

class ListPosts extends Component {
  state = {
    sortParam: '-voteScore'
  }

  componentDidMount() {
    !this.props.posts.items.length && this.props.fetchPosts()
  }

  changeOrder = sortParam => (
    this.setState({
      sortParam
    })
  )

  render() {
    const { posts } = this.props
    const { sortParam } = this.state

    let content = ''
    if ( posts.items.length ) {
      content = (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'space-around' }}>
          { posts.items.sort( sortBy( sortParam ) ).map( post => (
            <Post post={ post } />
          )  )  }
        </div>
      )
    }
    return (
      <div>
        <h1>Posts</h1>
        <div>
          <p>
            Order by:
            <span onClick={ () => this.changeOrder( '-voteScore' ) }>
              vote score
            </span>
            |
            <span onClick={ () => this.changeOrder( 'title' ) }>
              Title
            </span>
          </p>
        </div>
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
