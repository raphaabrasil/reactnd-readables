
import * as CommentsAPI from '../../api/comments'

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const getPostComments = ( postId, comments ) => (
  {
    type: GET_POST_COMMENTS,
    postId,
    items: comments,
  }
)

export const fetchPostComments = postId => dispatch => {
  CommentsAPI.getPostComments( postId )
    .then( comments =>  dispatch( getPostComments( postId, comments ) ) )
}

export const addComment = ( postId, comment ) => (
  {
    type: ADD_COMMENT,
    postId,
    comment,
  }
)

export const insertComment = ( commentData ) => dispatch => (
  CommentsAPI.addComment( commentData )
  .then( comment => dispatch( addComment( commentData.parentId, comment ) ) )
)

export const edit = ( postId, comment ) => (
  {
    type: EDIT_COMMENT,
    postId,
    comment,
  }
)

export const editComment = ( commentData ) => dispatch => (
  CommentsAPI.editComment( commentData )
  .then( comment => dispatch( edit( comment.parentId, comment ) ) )
)

export const voteComment = comment => (
  {
    type: VOTE_COMMENT,
    comment,
  }
)

export const rateComment = ( commentId, vote ) => dispatch => (
  CommentsAPI.voteComment( commentId, vote )
  .then( comment => dispatch( voteComment( comment ) ) )
)
