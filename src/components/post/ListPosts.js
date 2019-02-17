import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { fetchPosts } from './actions'
import Post from './Post'

class ListPosts extends Component {
  state = {
    sortParam: '-voteScore'
  }

  componentDidMount() {
    this.props.fetchPosts()
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
    if ( posts.allIds.length ) {
      const postsContent = posts.allIds.map( id => ( posts[id] ) )
      content = (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'space-around' }}>
          { postsContent.sort( sortBy( sortParam ) ).map( post => (
            <Post post={ post } />
          )  )  }
        </div>
      )
    }
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ marginRight: 10 }}>Posts</h1>
          <Button component= {Link} to={'/post/create'}variant="fab" color="secondary" aria-label="Add" mini>
            <AddIcon />
          </Button>
        </div>
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
