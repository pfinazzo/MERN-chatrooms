import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {getUserData} from './../utilities/userData';

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
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: ""
      }
    };
  }

  routeTo = (path) => {
    if (path === "/logout"){
      console.log('hit');
      localStorage.clear();
      axios.get("/users/logout").then(res => {
        this.setState({
          user: {
            username: null,
            email: null
          }
        }, () => {
          this.props.history.push("/login");
        })
        return;
      })
    } else {
      this.props.history.push(path);
    }
  }

  componentWillMount() {
    let user = getUserData();
    this.setState({user});
  }


  render() {
      // console.log(this.state);
    let nav;
    if (this.state.user ) {
      nav =
        <Toolbar>
          <Button onClick={() => this.routeTo("/")} color="inherit">
            Home
          </Button>
          <Button onClick={() => this.routeTo("/logout")} color="inherit">Logout</Button>
        </Toolbar>
    } else {
      nav = <Toolbar>
        <Button onClick={() => this.routeTo("/signup")} color="inherit">signup</Button>
        <Button onClick={() => this.routeTo("/login")} color="inherit">Login</Button>
      </Toolbar>
    }
    return (
      <AppBar position="static">
        {nav}
      </AppBar>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar)