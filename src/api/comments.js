import { apiUrl, headers } from './helper'

export const getPostComments = postId => (
  fetch ( `${ apiUrl }/posts/${postId}/comments`, { headers } )
    .then( res => res.json() )
)

export const addComment = ( commentData ) => (
  fetch ( `${ apiUrl }/comments`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify( commentData ),
  } )
  .then( res => res.json() )
)

export const editComment = ( commentData ) => (
  fetch ( `${ apiUrl }/comments/${commentData.id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify( commentData ),
  } )
  .then( res => res.json() )
)

export const voteComment = ( commentId, vote ) => (
  fetch ( `${ apiUrl }/comments/${ commentId }`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify( { option: vote } ),
  } )
  .then( res => res.json() )
)
