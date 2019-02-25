import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { fetchPost } from '../components/post/actions'
import Comments from '../components/comments/Comments'
import { deletePost } from '../api/post'

class PostPage extends Component {

  componentDidMount() {
    const { postId } = this.props.match.params
    !this.props.posts[postId] && this.props.fetchPost( postId )
  }

  handleDelete = () => {
    const { postId } = this.props.match.params
    deletePost(postId)
    this.props.history.push('/')
  }

  render() {
    const { postId } = this.props.match.params
    const post = this.props.posts[postId]
    let content = (<p>No posts found</p>)
    if ( post ) {
      content = (
        <div>
          <Link to={`/post/edit/${post.id}`}>Editar</Link>
          <p onClick={ this.handleDelete }>Deletar</p>
          <h1>{post.title}</h1>
          <p className='post__writer'>{`Writed by: ${post.author}`}</p>
          <Moment className='post__date'
            format="DD/MM/YYYY HH:mm">
            {post.timestamp}
          </Moment>
          <p>{post.voteScore}</p>
          <p className='post__body'>{ post.body }</p>
          <Comments postId={ post.id } />
        </div>
      )
    }
    return (
      <div className='post'>
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
    fetchPost: ( postId ) => dispatch( fetchPost( postId ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
