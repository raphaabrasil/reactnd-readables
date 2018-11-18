import { apiUrl, headers } from './helper'

export const getPostComments = postId => (
  fetch ( `${ apiUrl }/posts/${postId}/comments`, { headers } )
    .then( res => res.json() )
)

