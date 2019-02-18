import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { editComment } from './actions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
      <div>
        <p onClick={ this.handleEdit }>editar</p>
        <div>
          <p>{ comment.author }</p>
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
            : <p>{ comment.body }</p>
          }
                   <p>Votes: { comment.voteScore }</p>
          <Moment
            format="DD/MM/YYYY HH:mm">
            {comment.timestamp}
          </Moment>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    editComment: commentData => dispatch( editComment( commentData ) ),
  }
}

export default connect(null, mapDispatchToProps)(Comment)