import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { fetchCategoryPosts } from '../components/category/actions'
import Post from '../components/post/Post'
import { dynamicSort } from '../utils/sorter'
import Sort from '../components/interactions/Sort'


class CategoryPage extends Component {
	state = {
		category: '',
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

  render() {
    const { categoriesPosts } = this.props
    const { category } = this.state
    const categoryPosts = categoriesPosts[category]
		const sortParam = this.props.interactions.sort
    let content = (<p>No posts found for {category}</p>)
    if ( this.hasPostOnCategory() ) {
      content = (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'space-around' }}>
          { categoryPosts.posts.sort( dynamicSort( sortParam ) ).map( post => (
            <Post post={ post } />
          )  )  }
        </div>
      )
    }
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <h1 style={{ marginRight: 10 }}><span style={{ textTransform: 'capitalize' }}>{ category }</span> posts</h1>
          <Button component= {Link} to={'/post/create'}variant="fab" color="secondary" aria-label="Add" mini>
            <AddIcon />
          </Button>
					<Sort />
        </div>
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ categoriesPosts, interactions }) => {
  return {
		categoriesPosts,
		interactions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategoryPosts: ( category ) => dispatch( fetchCategoryPosts( category ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
