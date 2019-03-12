import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  headerBar: {
    padding: '10px 0',
    background: '#6545a0',
    textAlign: 'center',
  },
  title: {
    font: "40px 'Cedarville Cursive', cursive",
    lineHeight: 1.2,
    margin: 0,
    color: 'white',
    textDecoration: 'none',
  },
};



class Header extends Component {
  render() {
    const { classes } = this.props
    return (
      <header className={ classes.headerBar }>
        <h1 className={ classes.title }><Link className={ classes.title } to="/">Readables</Link></h1>
      </header>
    )
  }
}

export default withStyles(styles)(Header)
