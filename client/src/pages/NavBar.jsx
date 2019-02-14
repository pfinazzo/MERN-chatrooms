import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  routeTo = (path) => {
    this.props.history.push(path);
  }

  render(){
    return (
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => this.routeTo("/")} color="inherit">
          Home
          </Button>
          <Button onClick={() => this.routeTo("/signup")} color="inherit">signup</Button>
          <Button onClick={() => this.routeTo("/login")} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>      
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar)