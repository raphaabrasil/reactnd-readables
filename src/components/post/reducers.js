import { GET_POSTS } from './actions'

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

