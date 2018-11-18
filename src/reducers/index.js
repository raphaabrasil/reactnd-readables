import { combineReducers } from 'redux'
import { categories, categoriesPosts } from '../components/category/reducers'
import { posts, post } from '../components/post/reducers'
import { postsComments } from '../components/comments/reducers'

export default combineReducers({
  categories,
  posts,
  post,
  categoriesPosts,
  postsComments,
})
