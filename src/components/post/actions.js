import * as PostAPI from '../../api/post'

export const GET_POSTS = 'GET_POSTS'

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

