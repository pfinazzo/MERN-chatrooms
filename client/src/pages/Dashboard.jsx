import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateButton from '../components/CreateButton';
import Grid from '@material-ui/core/Grid';
import NavBar from './../components/NavBar';
import { getUserData } from '../utilities/userData';
import ChatList from './../components/ChatList';
import axios from 'axios';

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

  componentWillMount(){
    let {user} = this.props;
    this.setState({user}, () => {
      axios.get('/users/login').then(res => {
        console.log(res);
      }).catch(err => {
        if (err) throw err;
      })
    });
  }

  welcomeStyle = {
    textAlign: 'center'
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
          <Grid container item xs={6} direction="column-reverse" justify="center" alignItems="center">
          <CreateButton callback={this.goToCreateForm} />
            <ChatList />
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