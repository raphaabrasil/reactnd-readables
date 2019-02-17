import { GET_POST_COMMENTS, ADD_COMMENT } from './actions'

const initialPostCommentsState = {
}

export const postsComments = ( state = initialPostCommentsState, action ) => {

  const { postId } = action
  switch ( action.type ) {
    case GET_POST_COMMENTS:
      const { items } = action

      return {
        ...state,
        [postId]: {
          items,
        }
      }
    case ADD_COMMENT:
      const { comment } = action
      return {
        ...state,
        [postId]: {
          ...state[postId],
          items: [
            ...state[postId].items,
            comment,
          ]
        }
      }
    default:
      return state
  }
}

