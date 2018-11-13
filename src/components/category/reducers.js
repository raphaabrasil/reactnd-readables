import { GET_CATEGORIES, getCategories } from './actions'

const initialCategoriesState = {
  items: []
}

export const categories = ( state = initialCategoriesState, action ) => {
  switch ( action.type ) {
    case GET_CATEGORIES:
      return {
        ...state,
        items: action.items,
      }
    default:
      return state
  }
}

