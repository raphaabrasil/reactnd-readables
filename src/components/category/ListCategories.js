import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories } from './actions'

class ListCategories extends Component {
  componentDidMount() {
    !this.props.categories.items.length && this.props.fetchCategories()
  }

  render() {
    const { categories } = this.props
    let content = ''
    if ( categories.items.length ) {
      content = (
         <ul>
          { categories.items.map( category => (
            <li key={category.path}><Link to={ category.path}>{ category.name }</Link></li>
          ))}
        </ul>
      )
    }
    return (
      <div className="App">
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
