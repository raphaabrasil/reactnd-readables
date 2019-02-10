import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { createPost } from '../components/post/actions'
import { fetchCategories } from '../components/category/actions'
import { fetchPost } from '../components/post/actions'
import uuid from "uuid"

class EditPost extends Component {
  state = {
    post: {
      id: this.props.post.content && this.props.post.content.id || '',
      title: this.props.post.content && this.props.post.content.title || '',
      category: this.props.post.content && this.props.post.content.category  || '',
      body: this.props.post.content && this.props.post.content.body || '',
      author: this.props.post.content && this.props.post.content.author || '',
    },
    snackOpen: false,
  }

  componentDidMount() {
    !this.props.categories.items.length && this.props.fetchCategories()
    this.props.fetchPost( this.props.match.params.postId )
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [event.target.name]: event.target.value
      }
    })
  }

  submitPost = event => {
    const postBody = {...this.state.post, timestamp: Date.now(), id: uuid.v1()}
    this.props.createPost(postBody)
    this.setState({snackOpen: true})
  }

  handleSnackClose = () => {
    this.props.history.push('/')
  }

  render() {
    const { categories, post } = this.props
    console.log(post)
    let categorySelection = ''
    categorySelection = categories.items.map( category => (
      <MenuItem value={category.name}>{category.name}</MenuItem>
    ))

    return (
      <div>
        <form autoComplete="off">
          <TextField
            id="title"
            name="title"
            label="Title"
            fullWidth
            margin="normal"
            value={ this.state.post.title }
            onBlur={this.handleChange}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Select
              value={this.state.post.category}
              onChange={this.handleChange}
              inputProps={{
                name: 'category',
                id: 'category',
              }}
            >
              { categorySelection }
            </Select>
          </FormControl>
          <TextField
            id="author"
            name="author"
            label="Author"
            fullWidth
            margin="normal"
            onBlur={this.handleChange}
          />
          <TextField
            id="content"
            name="body"
            label="Content"
            multiline
            margin="normal"
            fullWidth
            onBlur={this.handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitPost}
          >
            Send
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackOpen}
          autoHideDuration={10000}
          onClose={this.handleSnackClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Post created!</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleSnackClose}>
              Return to Home
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnackClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, post }) => {
  return {
    categories,
    post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch( createPost( post ) ),
    fetchCategories: () => dispatch( fetchCategories() ),
    fetchPost: postId => dispatch( fetchPost( postId ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
