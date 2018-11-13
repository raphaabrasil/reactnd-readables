import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { fetchCategories } from './components/category/actions'

class App extends Component {
  componentDidMount() {
    !this.props.categories.items.length && this.props.fetchCategories()
  }

  render() {
    const { categories } = this.props
    let content = ''
    if (categories.items.length) {
      content = (
         <ul>
          { categories.items.map( category => (
            <li key={category.path}>{ category.name }</li>
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
