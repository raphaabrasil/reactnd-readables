import * as CategoryAPI from '../../api/category'
import * as PostAPI from '../../api/post'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS'


export const getCategories = categories => (
  {
    type: GET_CATEGORIES,
    items: categories.categories,
  }
)

export const fetchCategories = () => dispatch => {
  CategoryAPI.getCategories()
    .then( categories => dispatch( getCategories( categories ) ) )
}

export const getCategoryPosts = ( category, posts ) => (
  {
    type: GET_CATEGORY_POSTS,
    category,
    posts,
  }
)

export const fetchCategoryPosts = category => dispatch => {
  PostAPI.getPostsByCategory( category )
    .then( posts => dispatch( getCategoryPosts( category, posts ) ) )
}
