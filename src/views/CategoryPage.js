import React, { Component } from 'react';
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { fetchCategoryPosts } from '../components/category/actions'
import Post from '../components/post/Post'

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
        <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'space-around' }}>
          { categoryPosts.posts.sort( sortBy( sortParam ) ).map( post => (
            <Post post={ post } />
          )  )  }
        </div>
      )
    }
    return (
      <div>
        <h1><span style={{ textTransform: 'capitalize' }}>{ category }</span> posts</h1>
        <p>
          Order by:
          <span onClick={ () => this.changeOrder( '-voteScore' ) }>
            vote score
          </span>
          |
          <span onClick={ () => this.changeOrder( 'title' ) }>
            Title
          </span>
        </p>
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
