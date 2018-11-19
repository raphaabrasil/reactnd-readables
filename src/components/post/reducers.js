import { GET_POSTS, GET_POST, ADD_POST } from './actions'

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
    case ADD_POST:
      const { post } = action

      return {
        ...state,
        items: [
          ...state.items,
          post
        ]
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
