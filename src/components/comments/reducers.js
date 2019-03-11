import { GET_POST_COMMENTS, ADD_COMMENT, EDIT_COMMENT, VOTE_COMMENT } from './actions'

const initialPostCommentsState = {
  allIds: [],
}

export const postsComments = ( state = initialPostCommentsState, action ) => {

  const { postId, comment } = action
  const nextState = { ...state }
  switch ( action.type ) {
    case GET_POST_COMMENTS:
      const { items } = action
      nextState[postId] = { allIds: [] }

      items.forEach( item => {
        nextState[postId][item.id] = item
        nextState[postId].allIds = [ ...nextState[postId].allIds, item.id]
      })
      return nextState

    case ADD_COMMENT:
      nextState[postId][comment.id] = comment
      nextState[postId].allIds = [ ...nextState[postId].allIds, comment.id ]
      return nextState

    case EDIT_COMMENT:
      nextState[postId][comment.id] = {
        ...nextState[postId][comment.id],
        body: comment.body
      }
      return nextState

    case VOTE_COMMENT:
      nextState[action.comment.parentId][action.comment.id] = action.comment
      return nextState

    default:
      return state
  }
}

