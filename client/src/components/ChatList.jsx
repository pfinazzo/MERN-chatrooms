import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { ListItem } from '@material-ui/core';
import ChatListItem from './ChatListItem'; 


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeData: [
        {
          chatroomName: "material ui is cool",
          users: ['bob', 'joe', 'mike'],
          messages: [{
            text: "hello",
            from: 'bob'
          }],
        },
        {
          chatroomName: "super sick styling chat",
          users: [' jon', ' doodlebob', 'patrick star'],
          messages: [{
            text: "me hoy minoy",
            from : "doodlebob"
          }],
        }
      ]
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <List className={classes.root}>
      {this.state.fakeData.map(chat => {
        return <ChatListItem classes={classes} chatroomName={chat.chatroomName} userNames={chat.users} latestMessage={chat.messages[0]}/>
      })}
      </List>
    );
  }
}

ChatList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatList);