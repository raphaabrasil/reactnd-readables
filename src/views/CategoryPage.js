import React, { Component } from 'react';
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
    this.props.fetchCategoryPosts( category )
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
    let content = ''
    if ( categoryPosts && categoryPosts.posts.length ) {
      content = (
         <ul>
          { categoryPosts.posts.sort( sortBy( sortParam ) ).map( post => (
            <li key={post.id}><b>{ post.title }</b> - voteScore: { post.voteScore }</li>
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