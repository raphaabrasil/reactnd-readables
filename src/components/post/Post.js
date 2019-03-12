import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from  'react-router-dom'
import PropTypes from 'prop-types';
import { ratePost } from './actions'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThumbUp, ThumbDown } from '@material-ui/icons'

const styles = {
  card: {
    width: 'calc(33% - 20px)',
    margin: 10,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
};


class Post extends Component {
  handleVote = vote => {
    const { id } = this.props.post
    this.props.ratePost(id, vote)
  }

  render() {
    const { classes, post } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            { post.category }
          </Typography>
          <Typography variant="headline" component="h2">
            { post.title }
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            { post.author }
          </Typography>
          <Typography component="p">
            { post.body }
          </Typography>
          <Typography component="p">
            { post.commentCount } comments
          </Typography>
        </CardContent>
        <CardActions className={ classes.cardActions }>
          <Button component={ Link } to ={`${post.category}/${post.id}`} color="primary" size="small">Read More</Button>
          <div style={{ display: 'flex', marginBottom: 5 }}>
            <ThumbUp onClick = { () => this.handleVote('upVote')} style={{ color: 'green'}}/>
            <span style={{ margin: '0 10px'}}>{ post.voteScore }</span>
            <ThumbDown onClick = { () => this.handleVote('downVote')} style={{ color: 'red' }} />
          </div>
        </CardActions>
      </Card>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    ratePost: ( postId, vote ) => dispatch ( ratePost( postId, vote ) ),
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Post))
