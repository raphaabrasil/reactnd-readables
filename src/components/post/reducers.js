import {
  GET_POSTS,
  GET_POST,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
} from './actions'

const initialPostsState = {
  allIds: []
}

export const posts = ( state = initialPostsState, action ) => {
  let nextState = { ...state }
  const { post } = action

  switch ( action.type ) {
    case GET_POSTS:
      const { items } = action
      items.forEach( item => {
        nextState[item.id] = item
        if (!nextState.allIds.includes(item.id)) {
          nextState.allIds = [...nextState.allIds, item.id]
        }
      })
      return nextState

    case GET_POST:
      const { content } = action
      nextState[content.id] = content

      if (!nextState.allIds.includes(content.id)) {
        nextState.allIds = [...nextState.allIds, content.id]
      }

      return nextState

    case ADD_POST:
      nextState[post.id] = post
      nextState.allIds = [...nextState.allIds, post.id]

      return nextState

    case VOTE_POST:
      nextState[post.id] = post
      return nextState

    case EDIT_POST:
      nextState[post.id] = post
      return nextState

    case DELETE_POST:
      nextState[post.id] = post
      return nextState

    default:
      return state
  }
}

