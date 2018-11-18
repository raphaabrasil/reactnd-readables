import React, { Component } from 'react';
import { Link } from  'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
};

class Post extends Component {
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
      </CardContent>
      <CardActions>
        <Button component={ Link } to ={`${post.category}/${post.id}`} color="primary" size="small">Read More</Button>
      </CardActions>
    </Card>
  );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Post);
