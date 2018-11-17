import { apiUrl, headers } from './helper'

export const getPosts = () => (
  fetch ( `${ apiUrl }/posts`, { headers } )
    .then( res => res.json() )
)

export const getPostsByCategory = category => (
  fetch ( `${ apiUrl }/${ category }/posts`, { headers } )
    .then( res => res.json() )
)
