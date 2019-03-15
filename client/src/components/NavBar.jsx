import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Grid from '@material-ui/core/Grid/Grid';
import NewChatroomNavButton from './NavButton';

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
    if (path === "/logout") {
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
    let {user} = this.props;
    if (user){
      this.setState({user});
    } else {
      this.setState({user: null});
    }
  }


  render() {
    let nav;
    if (this.state.user) {
      nav =
        <Toolbar>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Button onClick={() => this.routeTo("/")} color="inherit">Home</Button>
              <Button onClick={() => this.routeTo("/logout")} color="inherit">Logout</Button>
            </Grid>
            <Grid container xs={6} justify="flex-end">
              <Grid container justify="space-evenly" xs={3}>
                <Button onClick={() => this.routeTo("/add-friend")} color="inherit">Add Friend</Button>
              </Grid>
              <Grid container justify="space-evenly" xs={3}>
                <Button onClick={() => this.routeTo("/requests")} color="inherit">Requests</Button>
              </Grid>
              <Grid container justify="space-evenly" xs={3}>
                <Button onClick={() => this.routeTo("/friends")} color="inherit">Friends</Button>
              </Grid>
              <Grid container justify="space-evenly" xs={1}>
                <Button onClick={() => this.routeTo("/create")} color="inherit"><NewChatroomNavButton/></Button>
              </Grid>
            </Grid>
          </Grid>
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