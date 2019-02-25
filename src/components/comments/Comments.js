import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPostComments, insertComment } from './actions'
import Comment from './Comment'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import uuid from "uuid"

class Comments extends Component {
  state = {
    comment: {
      body: '',
      author: '',
    }
  }
  componentDidMount() {
    const { postId } = this.props
    !this.props.postsComments[postId] && this.props.fetchPostComments( postId )
  }

  handleComment = event => {
    this.setState({
      comment: {
        ...this.state.comment,
        [event.target.name]: event.target.value
      }
    })
  }

  submitComment = () => {
    const commentData = {...this.state.comment, timestamp: Date.now(), id: uuid.v1(), parentId: this.props.postId }
    this.props.insertComment( commentData )
    this.setState({
      comment: {
        body: '',
        author: '',
      }
    })
  }

  getComments = () => {
    const { postsComments, postId } = this.props
    const comments = postsComments[postId]
    if (!comments) {
      return comments
    }
    return comments.allIds.map( id => (
      comments[id]
    ))
  }

  render() {
    const comments = this.getComments()
    const commentCount = comments && comments.length

    return (
      <div className="comments">
        <div className='comments__header'>{`${commentCount} Comments`}</div>
        <form autoComplete="off">
          <TextField
            id="author"
            name="author"
            label="Author"
            fullWidth
            margin="normal"
            value={ this.state.comment.author }
            onChange={ this.handleComment }
          />
          <TextField
            id="content"
            name="body"
            label="Comment Message"
            multiline
            margin="normal"
            fullWidth
            value={ this.state.comment.body }
            onChange={ this.handleComment }
          />

        <Button
          variant="contained"
          color="primary"
          onClick={this.submitComment}
        >
          Send
        </Button>
      </form>

      { comments &&
        comments.map( comment => (
          <Comment
            comment={ comment }
          />
        ))
      }
    </div>
    );
  }
}

const mapStateToProps = ({ postsComments }) => {
  return {
    postsComments,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPostComments: ( postId ) => dispatch( fetchPostComments( postId ) ),
    insertComment: commentData => dispatch( insertComment( commentData ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
