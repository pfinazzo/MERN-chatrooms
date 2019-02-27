import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CreateButton from './CreateButton';
import Button from '@material-ui/core/Button/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: "10% auto",
    width: "80%",
  },
});

class FriendRequest extends Component {

  handleDelete = (id) => {
    console.log(this.props.received);
    if (this.props.received) {
      axios.post('/friends/decline-friend-request', { id }).then(res => {
        console.log(res);
      }).catch(err => {
        if (err) throw err;
      })
    } else {
      axios.post('/user/')
    }
  }

  handleAdd = (id) => {
    axios.put('/friends/accept-friend-request', { id }).then(res => {
      if (res.data === "success"){
        window.location.reload(); // janky fix 
      } else {
        console.log("nay")
      }
    }).catch(err => {
      if (err) throw err;
    })
  }

  render() {
    const { handleAdd, handleDelete, props } = this,
      { classes, header, text, _id, received } = props;
    console.log(_id);
    let deleteButton;
    if (header === "No friend requests sent" || header === "No friend requests received.. loser") {
      deleteButton = null
    } else {
      deleteButton = <Button onClick={() => handleDelete(_id)}><DeleteIcon className={classes.icon} /></Button>
    }
    return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {header}
        </Typography>
        <Typography component="p">
          {text}
        </Typography>
        {deleteButton }
        {received ? <CreateButton callback={() => handleAdd(_id)} /> : null}

      </Paper>
    );
  }
}
FriendRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FriendRequest);