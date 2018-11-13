import { apiUrl, headers } from './helper'

export const getPosts = () => (
  fetch ( `${apiUrl}/posts`, { headers } )
    .then( res => res.json() )
)
