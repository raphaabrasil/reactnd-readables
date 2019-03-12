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
import { editPost } from '../components/post/actions'
import { fetchCategories } from '../components/category/actions'
import Header from '../components/header/Header'

class EditPost extends Component {
  state = {
    post: {
      title: '',
      body: '',
      author: '',
      category: '',
    },
    snackOpen: false,
  }
  componentDidMount() {
    !this.props.categories.items.length && this.props.fetchCategories()
    const { postId } = this.props.match.params
    const post = this.props.posts[postId]
    if (post) {
      this.setState({
        ...this.state,
        post
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.posts !== this.props.posts) {
      const { postId } = this.props.match.params
      const post = this.props.posts[postId]
      this.setState({
        ...this.state,
        post
      })
    }
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
    const { post } = this.state
    this.props.editPost( post )
    this.setState({snackOpen: true})
  }

  handleSnackClose = () => {
    const { category, id } = this.state.post
    this.props.history.push(`/${ category }/${ id }`)
  }

  render() {
    if (!this.props.posts) {
      return
    }
    const { categories } = this.props
    let categorySelection = ''
    categorySelection = categories.items.map( category => (
      <MenuItem value={category.name}>{category.name}</MenuItem>
    ))

    return (
      <div>
        <Header />
        <div className="container">
          { this.state && this.state.post &&
              <div>
                <form autoComplete="off">
                  <TextField
                    id="title"
                    name="title"
                    label="Title"
                    fullWidth
                    margin="normal"
                    value={ this.state.post.title }
                    onChange={this.handleChange}
                  />
                  <FormControl fullWidth>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                      value={ this.state.post.category }
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
                    value={ this.state.post.author }
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="content"
                    name="body"
                    label="Content"
                    multiline
                    margin="normal"
                    fullWidth
                    value={ this.state.post.body }
                    onChange={this.handleChange}
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
                  message={<span id="message-id">Post edited!</span>}
                  action={[
                    <Button key="undo" color="secondary" size="small" onClick={this.handleSnackClose}>
                      Return to Post
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
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }) => {
  return {
    categories,
    posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editPost: post => dispatch( editPost( post ) ),
    fetchCategories: () => dispatch( fetchCategories() ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
