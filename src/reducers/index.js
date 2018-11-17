import { combineReducers } from 'redux'
import { categories, categoriesPosts } from '../components/category/reducers'
import { posts, post } from '../components/post/reducers'

export default combineReducers({
  categories,
  posts,
  post,
  categoriesPosts,
})
