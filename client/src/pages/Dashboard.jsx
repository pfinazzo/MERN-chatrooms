import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateButton from '../components/CreateButton';
import Grid from '@material-ui/core/Grid';
import NavBar from './../components/NavBar';
import ChatList from './../components/ChatList';
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
    let { user } = this.props;
    this.setState({ user }, () => {
      // console.log(this.state.user)
    })
  }

  wrapper = {
    margin: "20px auto",
    textAlign: "center",
    height: "500px",
    width: "500px",
    borderRadius: "10%",
    border: "1px solid black"
  }

  welcomeStyle = {
    textAlign: 'center'
  }

  btnWrapperStyle = {
    display: "block"
  }

  goToCreateForm = () => {
    this.props.history.push('/create');
  }

  render() {
    const { classes } = this.props;
    const { username } = this.state.user;
    return (
      <div className={classes.root}>
        <NavBar {...classes} {...this.props} />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1 style={this.welcomeStyle}>Welcome {username}</h1>
          </Grid>
          <Grid container item xs={6} direction="column" justify="center" alignItems="center">
            <div style={this.wrapper}>
              <ChatList />
              <div style={this.btnWrapperStyle}>
                <CreateButton callback={this.goToCreateForm} />
              </div>
            </div>
          </Grid>
          <Grid container item xs={6} direction="column" justify="center" alignItems="center">
            <div style={this.wrapper}>
              <Chatroom />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);