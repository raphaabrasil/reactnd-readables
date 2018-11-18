import React, { Component } from 'react';
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { fetchPost } from '../components/post/actions'
import Comments from '../components/comments/Comments'

class PostPage extends Component {

  componentDidMount() {
    const { postId } = this.props.match.params
    this.props.fetchPost( postId )
  }

  render() {
    const { post } = this.props
    let content = (<p>No posts found</p>)
    if ( post.content ) {
      content = (
        <div>
          <p>{ post.content.id }</p>
          <p>{post.content.title}</p>
          <p>{post.content.author}</p>
          <Moment
            format="DD/MM/YYYY HH:mm">
            {post.content.timestamp}
          </Moment>
          <p>{post.content.voteScore}</p>
          <p>{ post.content.body }</p>
          <Comments postId={ post.content.id } />
        </div>
      )
    }
    return (
      <div className="App">
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => {
  return {
    post,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: ( postId ) => dispatch( fetchPost( postId ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
