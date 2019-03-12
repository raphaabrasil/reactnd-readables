import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { editComment, rateComment, deleteComment } from './actions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { ThumbUp, ThumbDown } from '@material-ui/icons'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: props.comment.body,
      edit: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.comment !== prevProps.comment) {
      this.setState({
        ...this.state,
        body: this.props.comment.body
      })
    }
  }

  handleEdit = () => {
    this.setState({
      ...this.state,
      edit: !this.state.edit,
    })
  }

  handleCommentBody = (event) => {
    this.setState({
      ...this.state,
      body: event.target.value
    })
  }

  handleVote = vote => {
    this.props.rateComment(this.props.comment.id, vote)
  }

  handleDelete = () => {
    const { deleteComment, comment } = this.props
    deleteComment(comment.id)
  }

  submitComment = () => {
    const { comment, editComment } = this.props
    const commentData = { body: this.state.body, timestamp: Date.now(), id: comment.id }
    editComment( commentData )
    this.setState({
      ...this.state,
      edit: false,
    })
  }

  render() {
    const { comment } = this.props
    const { body, edit } = this.state
    return (
      <div className='comment'>
        <p className='comments__author'>{ comment.author }
          <span className='comments__edit' onClick={ this.handleEdit }>edit</span>
          <span className='comments__edit'> | </span>
          <span className='comments__edit' onClick={ this.handleDelete }>delete</span>
        </p>
        <Moment className='comments__date'
          format="DD/MM/YYYY HH:mm">
          {comment.timestamp}
        </Moment>
        {
          edit
            ? <div>
              <TextField
                onChange={ this.handleCommentBody }
                value={ body }
              ></TextField>
              <Button
                variant="contained"
                color="primary"
                onClick={this.submitComment}
              >
                Edit
              </Button>
            </div>
            : <p className='comments__body'>{ comment.body }</p>
        }
        <div style={{ display: 'flex', marginBottom: 5 }}>
          <ThumbUp onClick = { () => this.handleVote('upVote')} style={{ color: 'green'}}/>
          <span style={{ margin: '0 10px'}}>{ comment.voteScore }</span>
          <ThumbDown onClick = { () => this.handleVote('downVote')} style={{ color: 'red' }} />
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    editComment: commentData => dispatch( editComment( commentData ) ),
    rateComment: ( commentId, vote ) => dispatch( rateComment( commentId, vote ) ),
    deleteComment: commentId => dispatch( deleteComment( commentId ) ),
  }
}

export default connect(null, mapDispatchToProps)(Comment)
