import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { fetchPosts } from './actions'
import Post from './Post'
import Sort from '../interactions/Sort'
import { dynamicSort } from '../../utils/sorter'

class ListPosts extends Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  orderedPosts = () => {
    const { posts } = this.props
    const sortParam = this.props.interactions.sort

    let postsContent = posts.allIds.map( id => ( posts[id] ) )
    return postsContent.sort( dynamicSort( sortParam ) )
  }

  render() {
    const orderedPosts = this.orderedPosts()

    let content = ''
    if ( orderedPosts.length ) {
      content = (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'space-around' }}>
          { orderedPosts.map( post => (
            <Post post={ post } />
          ) ) }
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
          <Sort />
        </div>
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ posts, interactions }) => {
  return {
    posts,
    interactions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch( fetchPosts() ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts)
