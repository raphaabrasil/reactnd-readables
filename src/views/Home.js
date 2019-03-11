import React, { Component } from 'react';
import ListCategories from '../components/category/ListCategories'
import ListPosts from '../components/post/ListPosts'

class Home extends Component {
  render() {
    return (
      <div className='container'>
        <ListCategories />
        <ListPosts />
      </div>
    )
  }
}

export default Home
