import * as PostAPI from '../../api/post'

export const GET_POSTS = 'GET_POSTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

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

export const edit = post => (
  {
    type: EDIT_POST,
    post
  }
)

export const editPost = post => dispatch => (
  PostAPI.updatePost( post )
    .then( post => dispatch( edit( post ) ) )
)

export const votePost = post => (
  {
    type: VOTE_POST,
    post,
  }
)

export const ratePost = ( postId, vote ) => dispatch => (
  PostAPI.votePost( postId, vote )
  .then( post => dispatch( votePost( post ) ) )
)

export const markDeleted = post => (
  {
    type: DELETE_POST,
    post,
  }
)

export const deletePost = postId => dispatch => (
  PostAPI.deletePost( postId )
  .then( post => dispatch( markDeleted( post ) ) )
)

