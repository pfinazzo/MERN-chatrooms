import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import NavBar from '../components/NavBar';
import axios from 'axios';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e, key  ) => {
    this.setState({
      [key  ]: e.target.value
    })
  }
  

  isFormInvalid = () => {
    return (!this.state.email && this.state.username && this.state.password && this.state.password === this.state.passwordConfirm);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/users/signup", this.state).then(res => {
      if (res.statusText === "OK"){
        this.props.history.push('/login');
      }
    }).catch(err => {
      if (err) throw err;
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar {...this.props} />
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
        </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" onChange={(e) => this.handleChange(e, "email")} name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">username</InputLabel>
                <Input id="username" onChange={(e) => this.handleChange(e, "username")} name="username" autoComplete="username" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input onChange={(e) => this.handleChange(e, "password")} name="password" type="password" id="password" autoComplete="current-password" />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                <Input onChange={(e) => this.handleChange(e, "passwordConfirm")} name="passwordConfirm" type="password" id="passwordConfirm" autoComplete="current-password" />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={this.isFormInvalid()}
                onClick={(e) => this.handleSubmit(e)}
              >
                Sign in
          </Button>
            </form>
          </Paper>
        </main>
      </div>
    )
  }
}

SignUpPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpPage);