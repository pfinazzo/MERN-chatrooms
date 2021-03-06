import React, { Component } from 'react';
import NavBar from './../components/NavBar';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import StandardButton from './../components/StandardButton';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import axios from 'axios';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: deepOrange[800],
    },
  },
});

class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { username: '' }
    }
  }

  formValid = () => {
    return !!this.state.user.username;
  }

  handleChange = (key, e) => {
    this.setState({ [key]: { username: e.target.value } });
  }

  handleSubmit = () => {
    axios.get('/friends', {withCredentials: true}).then(res => {
      console.log(res);
      if (res.data === "no user") {
        this.props.history.push('/login');
      }
      let friends = res.data;
      this.setState({ friends }, () => {
        let usernames = this.state.friends.map(({ username }) => username);
        if (!usernames.includes(this.state.user.username)) {
          axios.post('/friends/add-friend', this.state.user, {withCredentials: true}).then(res => {
            if (res.statusText === "OK") {
              this.props.history.push('/requests');
            }
          }).catch(err => {
            if (err) throw err;
          })
        } else {
          alert('you already have this friend')
        }
      });
    }).catch(err => {
      if (err) throw err;
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar {...this.props} />
        <form style={this.wrapStyle} className={classes.container} noValidate autoComplete="off">
          <Grid container spacing={24} alignItems="center" justify="center" direction="column">
            <Grid item xs={3} alignItems="center" justify="center" direction="column">
              <TextField
                id="standard-name"
                label="add a friend"
                className={classes.textField}
                value={this.state.name}
                onChange={(e) => this.handleChange('user', e)}
                margin="normal"
              />
              <StandardButton formValid={this.formValid()} callback={this.handleSubmit} />
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(AddFriend);