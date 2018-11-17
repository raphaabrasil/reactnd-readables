import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { fetchCategoryPosts } from '../components/category/actions'

class CategoryPage extends Component {
  state = {
    sortParam: '-voteScore'
  }

  componentDidMount() {
    const { category } = this.props.match.params
    this.setState({
      category
    })
    !this.hasPostOnCategory() && this.props.fetchCategoryPosts( category )
  }

  hasPostOnCategory = () => {
    const categoryPosts = this.props.categoriesPosts[this.state.category]
    return (categoryPosts && categoryPosts.posts.length)
  }

  changeOrder = sortParam => (
    this.setState({
      sortParam
    })
  )

  render() {
    const { categoriesPosts } = this.props
    const { sortParam, category } = this.state
    const categoryPosts = categoriesPosts[category]
    let content = (<p>No posts found for {category}</p>)
    if ( this.hasPostOnCategory() ) {
      content = (
         <ul>
          { categoryPosts.posts.sort( sortBy( sortParam ) ).map( post => (
            <li key={post.id}>
              <Link to={`${category}/${post.id}`}>{ post.title }</Link> - id: {post.id} - voteScore: { post.voteScore }
            </li>
          ))}
        </ul>
      )
    }
    return (
      <div className="App">
        <button onClick={ () => this.changeOrder( '-voteScore' ) }>
          Order by vote score
        </button>
        <button onClick={ () => this.changeOrder( 'title' ) }>
          Order by title
        </button>
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ categoriesPosts }) => {
  return {
    categoriesPosts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategoryPosts: ( category ) => dispatch( fetchCategoryPosts( category ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
