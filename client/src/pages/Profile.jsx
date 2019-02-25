import React, {Component} from 'react';
import NavBar from '../components/NavBar';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

class Profile extends Component {
  state = {
    user: {username: ""}
  }

  componentWillMount(){
    const user = JSON.parse(localStorage.getItem("userData"));
    this.setState({user}, () => {
      if (!this.state.user){
        return this.props.history.push("/login");
      }
    });
  }

  render(){
    const { classes } = this.props;
    let nav, paper;
    if (this.state.user){
      nav = <NavBar user={this.state.user} {...classes} {...this.props}/>;
      paper = <Paper className={classes.paper}>Welcome {this.state.user.username}</Paper>;
    } else {
      nav = <NavBar user={null} {...classes} {...this.props}/>;
      paper = null;
    }
    return (
      <div className={classes.root}>
      {nav}
        <Grid container spacing={24}>
          <Grid item xs={12}>
            {paper}
          </Grid>
        </Grid>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);