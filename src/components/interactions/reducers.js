import { SORT } from './actions'

const initialState = {
  sort: 'title'
}

export const interactions = ( state = initialState, action ) => {
  switch ( action.type ) {
    case SORT:
      const { sort } = action
      return {
        ...state,
        sort
      }

    default:
      return state
  }
}

