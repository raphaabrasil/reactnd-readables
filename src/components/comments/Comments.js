import React, { Component } from 'react';
import Moment from 'react-moment'
import { connect } from 'react-redux'
import sortBy from 'sort-by'
import { fetchPostComments } from './actions'

class Comments extends Component {

  componentDidMount() {
    const { postId } = this.props
    this.props.fetchPostComments( postId )
    console.log(this.props)
  }

  postComments = () => {
    const { postsComments, postId } = this.props
    if (postsComments && postsComments[postId]) {
      return postsComments[postId].items
    }
  }

  render() {
    const comments = this.postComments()
    let content = (<p>No comments for this post</p>)
    if ( comments ) {
      content = comments.sort( sortBy( '-voteScore' ) ).map( comment => (
        <div>
          <p>{ comment.author }</p>
          <p>{ comment.body }</p>
          <p>Votes: { comment.voteScore }</p>
          <Moment
            format="DD/MM/YYYY HH:mm">
            {comment.timestamp}
          </Moment>
        </div>
      ) )
    }
    return (
      <div className="comments">
        <h1>Comments</h1>
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ postsComments }) => {
  return {
    postsComments,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPostComments: ( postId ) => dispatch( fetchPostComments( postId ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
