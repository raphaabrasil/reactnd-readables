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
import uuid from "uuid"
import Header from '../components/header/Header'

class CreatePost extends Component {
  state = {
    post: {
      category: ''
    },
    snackOpen: false,
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

  componentDidMount() {
    !this.props.categories.items.length && this.props.fetchCategories()
  }
  render() {
    const { categories } = this.props
    let categorySelection = ''
    categorySelection = categories.items.map( category => (
      <MenuItem value={category.name}>{category.name}</MenuItem>
    ))

    return (
      <div>
        <Header />
        <div className='container'>
          <form autoComplete="off">
            <TextField
              id="title"
              name="title"
              label="Title"
              fullWidth
              margin="normal"
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
      </div>
    )
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: post => dispatch( createPost( post ) ),
    fetchCategories: () => dispatch( fetchCategories() ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
