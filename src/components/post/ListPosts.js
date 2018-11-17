import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { fetchPosts } from './actions'

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
         <ul>
          { posts.items.sort( sortBy( sortParam ) ).map( post => (
            <li key={post.id}>
              <Link to={`${post.category}/${post.id}`}>{ post.title }</Link> - voteScore: { post.voteScore }
            </li>
          ))}
        </ul>
      )
    }
    return (
      <div className="App">
        <button onClick={ () => this.changeOrder( '-voteScore' ) }>
          Order by vote score
        </button>
        <button onClick={ () => this.changeOrder( 'title' ) }>
          Order by title
        </button>
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
