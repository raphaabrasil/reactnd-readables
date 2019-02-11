import { apiUrl, headers } from './helper'

export const getPosts = () => (
  fetch ( `${ apiUrl }/posts`, { headers } )
    .then( res => res.json() )
)

export const getPostsByCategory = category => (
  fetch ( `${ apiUrl }/${ category }/posts`, { headers } )
    .then( res => res.json() )
)

export const getPost = postId => (
  fetch ( `${ apiUrl }/posts/${ postId }`, { headers } )
    .then( res => res.json() )
)

export const addPost = post => (
  fetch ( `${ apiUrl }/posts`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  .then( res => res.json() )
)

export const updatePost = post => (
  fetch ( `${ apiUrl }/posts/${ post.id }`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify( post ),
  })
  .then( res => res.json() )
)

export const deletePost = postId => (
  fetch ( `${ apiUrl }/posts/${ postId }`, {
    method: 'DELETE',
    headers,
  })
  .then( res => res.json() )
)
