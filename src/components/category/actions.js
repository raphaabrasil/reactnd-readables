import * as CategoryAPI from '../../api/category'

export const GET_CATEGORIES = 'GET_CATEGORIES'


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
