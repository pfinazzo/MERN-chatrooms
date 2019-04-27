import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import NavBar from '../components/NavBar';
import CreateButton from '../components/CreateButton';
import StandardButton from '../components/StandardButton';
import axios from 'axios';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class CreateChatroomForm extends React.Component {
  state = {
    user: null,
    name: '',
    newUserInput: '',
    newAdminInput: '',
    admins: [],
    users: [],
  };

  componentDidMount() {
    let {user} = this.props;
    // default user to admin
    let admins = [user.username];
    this.setState({user, admins});
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };


  wrapStyle = {
    marginTop: "5%"
  }


  addUser = (key, array) => {
    if (this.state[key]) {
      let users = [...this.state[array]];
      users.push(this.state[key]);
      this.setState({
        [array]: users,
        [key]: ''
      });
    }
  }

  handleSubmit = () => {
    let {admins, users, name} = this.state,
        payload = {admins, users, name};
    axios.post('/chatrooms', payload, {withCredentials: true}).then(res => {
      console.log(res); 
    }).catch(err => {
      if (err) throw err;
    })
  }

  formValid = () => {
    return this.state.name && this.state.users.length !== 0;
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
                label="chatroom name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="add user"
                className={classes.textField}
                value={this.state.newUserInput}
                onChange={this.handleChange('newUserInput')}
                margin="normal"
              />
              <CreateButton callback={() => this.addUser('newUserInput', 'users')} />
              <TextField
                disabled
                id="filled-disabled"
                label="users"
                value={this.state.users.toString()}
                defaultValue={this.state.users.toString()}
                className={classes.textField}
                margin="normal"
                variant="filled"
              />
              <TextField
                id="standard-name"
                label="add admin"
                className={classes.textField}
                value={this.state.newAdminInput}
                onChange={this.handleChange('newAdminInput')}
                margin="normal"
              />
              <CreateButton callback={() => this.addUser('newAdminInput', 'admins')} />
              <TextField
                disabled
                id="filled-disabled"
                label="admins"
                value={this.state.admins.toString()}
                defaultValue={this.state.admins.toString()}
                className={classes.textField}
                margin="normal"
                variant="filled"
              />
              <StandardButton formValid={this.formValid()} callback={this.handleSubmit} />
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

CreateChatroomForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateChatroomForm);
