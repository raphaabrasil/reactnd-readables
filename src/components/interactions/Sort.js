import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Popper from '@material-ui/core/Popper'
import Grow from '@material-ui/core/Grow'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { updateSort } from './actions'

class Sort extends Component {
  state = {
    open: false,
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  }

  sortBy = sort => {
    const { updateSort } = this.props
    updateSort(sort)
    this.handleToggle();
  }
  render() {
    const { open } = this.state

    return (
      <div>
        <Button
          buttonRef={node => {
            this.anchorEl = node
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          Sort by
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={() => this.sortBy('title')}>Title</MenuItem>
                    <MenuItem onClick={() => this.sortBy('-voteScore')}>Vote Score</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
  }
}

const mapStateToProps = ({ interactions }) => {
  return {
    interactions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSort: sort => dispatch( updateSort( sort ) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort)
