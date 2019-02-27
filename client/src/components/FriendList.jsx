import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Friend from './Friend';

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

function FriendList(props) {
  const { classes, friends } = props;
        // {username} = user;
  return (
    <List className={classes.root}>
      {friends.map(friend => <Friend name={friend.username}/>)}
    </List>
  );
}

FriendList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FriendList);