import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateButton from '../components/CreateButton';
import Grid from '@material-ui/core/Grid';
import NavBar from './../components/NavBar';
import ChatList from './../components/ChatList';
import LoadingSign from './../components/LoadingSign';
import Chatroom from './../components/Chatroom';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    let {user} = this.props;
    this.setState({user});
  }

  welcomeStyle = {
    textAlign: 'center'
  }

  routeTo = (path) => {
    this.props.history.push(path);
  }

  render() {
    const { classes } = this.props;
    if (!this.props.user) {
      return (<Grid container spacing={24} justify="center" alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <div style={this.wrapStyle}>
            <h1 style={this.welcomeStyle}>loading...</h1>
            <LoadingSign />
          </div>
        </Grid>
      </Grid>)
    } else {
      let {username} = this.props.user
      return (
        <div className={classes.root}>
          <NavBar {...classes} {...this.props} />
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h1 style={this.welcomeStyle}>Welcome {username}</h1>
            </Grid>
            <Grid container xs={6} direction="column" justify="center" alignItems="center">
              <ChatList />
              <CreateButton callback={() => this.routeTo('/create')} />
            </Grid>
            <Grid xs={6} justify="center" alignItems="center">
              <Chatroom username={this.props.user.username} />
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

  Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(Dashboard);