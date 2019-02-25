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
import {setUserData} from './../utilities/userData';

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


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/users/login", this.state).then(res => {
      let {username, email, _id} = res.data;
      if (username && email && _id){
        let userData = {username, email, _id};
        setUserData(JSON.stringify(userData));
        this.props.setUserData(userData); // set state in app
        if (res.statusText === "OK"){
          this.props.history.push('/');
        }
      }
    }).catch(err => {
      if (err) throw err;
    })
  }

  handleFormChange = (e, name) => {
    this.setState({
      [name]: e.target.value
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
              Login
        </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Username</InputLabel>
                <Input onChange={(e) => this.handleFormChange(e, "username")}id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input onChange={(e) => this.handleFormChange(e, "password")}name="password" type="password" id="password" autoComplete="current-password" />
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
    
LoginPage.propTypes = {
          classes: PropTypes.object.isRequired,
      };
      
export default withStyles(styles)(LoginPage);