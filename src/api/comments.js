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


