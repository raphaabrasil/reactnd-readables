import React, { Component } from 'react';
import ListCategories from '../components/category/ListCategories'
import ListPosts from '../components/post/ListPosts'
import Header from '../components/header/Header'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <ListCategories />
          <ListPosts />
        </div>
      </div>
    )
  }
}

export default Home
