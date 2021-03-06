import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { fetchPost, ratePost, deletePost } from '../components/post/actions'
import Comments from '../components/comments/Comments'
import Header from '../components/header/Header'
import { ThumbUp, ThumbDown } from '@material-ui/icons'

class PostPage extends Component {

  componentDidMount() {
    const { postId } = this.props.match.params
    !this.props.posts[postId] && this.props.fetchPost( postId )
  }

  handleDelete = () => {
    const { postId } = this.props.match.params
    this.props.deletePost(postId)
    this.props.history.push('/')
  }

  handleVote = vote => {
    const { postId } = this.props.match.params
    this.props.ratePost(postId, vote)

  }

  render() {
    const { postId } = this.props.match.params
    const post = this.props.posts[postId]
    let content = (<p>No posts found</p>)
    if ( post ) {
      content = (
        <div>
          <h1>{post.title}</h1>

          <div style={{ display: 'flex', marginBottom: 5 }}>
            <Link className='post__date' to={`/post/edit/${post.id}`}>Edit</Link>
            <span className='post__date' style={{ margin: '0 5px'}}>|</span>
            <p className='post__date' style={{ cursor: 'pointer' }} onClick={ this.handleDelete }>Delete</p>
          </div>

          <div style={{ display: 'flex', marginBottom: 5 }}>
            <ThumbUp onClick = { () => this.handleVote('upVote')} style={{ color: 'green'}}/>
            <span style={{ margin: '0 10px'}}>{ post.voteScore }</span>
            <ThumbDown onClick = { () => this.handleVote('downVote')} style={{ color: 'red' }} />
          </div>
          <p className='post__writer'>{`Writed by: ${post.author}`}</p>
          <Moment className='post__date'
            format="DD/MM/YYYY HH:mm">
            {post.timestamp}
          </Moment>
          <p className='post__body'>{ post.body }</p>
          <Comments postId={ post.id } />
        </div>
      )
    }
    return (
      <div>
        <Header />
        <div className='post'>
          { content }
        </div>
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
    fetchPost: postId => dispatch( fetchPost( postId ) ),
    deletePost: postId => dispatch( deletePost( postId ) ),
    ratePost: ( postId, vote ) => dispatch ( ratePost( postId, vote ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
