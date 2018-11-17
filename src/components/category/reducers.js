import { GET_CATEGORIES, GET_CATEGORY_POSTS } from './actions'

const initialCategoriesState = {
  items: []
}

const initialCategoryPostsState = {}
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

export const categoriesPosts = ( state = initialCategoryPostsState, action ) => {
  switch ( action.type ) {
    case GET_CATEGORY_POSTS:
      const { category, posts } = action
      return {
        ...state,
        [category]: {
          ...category.posts,
          posts,
        }
      }
    default:
      return state
  }
}

