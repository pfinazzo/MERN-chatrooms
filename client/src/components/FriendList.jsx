import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Friend from './Friend';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto'
  },
  inline: {
    display: 'inline',
  },
});
 

class FriendList extends Component {
  
  handleDelete = (username) => {
    axios.post('/friends/unfriend', { username }).then(res => {
      if (res.status === 200) {
        this.props.fetchData();
      }
    }).catch(err => {
      if (err) throw err;
    })
  }
  render() {
    const { classes, friends } = this.props;
    // {username} = user;
    return (
      <List className={classes.root}>
        {friends.map(friend => <Friend handleDelete={this.handleDelete} id={friend._id} name={friend.username} />)}
      </List>
    );
  }
}

FriendList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FriendList);