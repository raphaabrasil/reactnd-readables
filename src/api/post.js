import { apiUrl, headers } from './helper'

export const getPosts = (category = null) => {
  const url =  category ? `${apiUrl}/${category}/posts` : `${apiUrl}/posts`
  fetch ( url, { headers } )
    .then( res => res.json() )
}
