import { GET_POSTS, GET_POST } from './actions'

const initialPostsState = {
  items: []
}

export const posts = ( state = initialPostsState, action ) => {
  switch ( action.type ) {
    case GET_POSTS:
      const { items } = action

      return {
        ...state,
        items,
      }

    default:
      return state
  }
}

export const post = ( state = {}, action ) => {
  switch ( action.type ) {
    case GET_POST:
      const { content } = action

      return {
        ...state,
        content,
      }

    default:
      return state
  }
}
