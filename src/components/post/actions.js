import * as PostAPI from '../../api/post'

export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'

export const getPosts = posts => (
  {
    type: GET_POSTS,
    items: posts,
  }
)

export const fetchPosts = () => dispatch => {
  PostAPI.getPosts()
    .then( posts => dispatch( getPosts( posts ) ) )
}

export const getPost = post => {
  return {
    type: GET_POST,
    content: post,
  }
}

export const fetchPost = postId => dispatch => {
  PostAPI.getPost( postId )
    .then( post =>  dispatch( getPost( post ) ) )
}

export const addPost = post => (
  {
    type: ADD_POST,
    post,
  }
)

export const createPost = post => dispatch => (
  PostAPI.addPost( post )
    .then( post => dispatch( addPost( post ) ) )
)
