import { GET_CATEGORIES } from './actions'

const initialCategoriesState = {
  items: []
}

export const categories = ( state = initialCategoriesState, action ) => {
  switch ( action.type ) {
    case GET_CATEGORIES:
      const { items } = action

      return {
        ...state,
        items,
      }

    default:
      return state
  }
}

