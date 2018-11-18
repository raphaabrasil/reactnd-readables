import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { fetchCategories } from './actions'

class ListCategories extends Component {
  componentDidMount() {
    !this.props.categories.items.length && this.props.fetchCategories()
  }

  render() {
    const { categories } = this.props
    let content = ''
    if ( categories.items.length ) {
      content = categories.items.map( category => (
        <Button
          component={ Link }
          to={ category.path }
          variant="contained"
          color="primary"
          style={{ margin: 10 }}
        > { category.name } </Button>
      ))
    }
    return (
      <div>
        <h1>Categories</h1>
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch( fetchCategories() ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories)
