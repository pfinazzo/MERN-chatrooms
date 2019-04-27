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
    if (this.props.received) {
      axios.post('/friends/decline-friend-request', { id }).then(res => {
        if (res.status === 200) this.props.reload();
      }).catch(err => {
        if (err) throw err;
      })
    } else {
      axios.post('/friends/delete-friend-request', {id}).then(res => {
        if (res.status === 200) this.props.reload();
      }).catch(err => {
        if(err) throw err;
      })
    }
  }

  handleAdd = (id) => {
    axios.put('/friends/accept-friend-request', { id }).then(res => {
      if (res.data === "success"){
        window.location.reload(); // janky fix 
      } 
    }).catch(err => {
      if (err) throw err;
    })
  }

  render() {
    const { handleAdd, handleDelete, props } = this,
      { classes, header, text, _id, received } = props;
    let deleteButton;
    if (header === "No friend requests sent" || header === "No friend requests received.. ") {
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