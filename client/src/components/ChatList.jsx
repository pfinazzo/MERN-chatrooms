import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';
import Card from '@material-ui/core/Card/Card';


const styles = theme => ({
  root: {
    width: '100%',
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
            from: "doodlebob"
          }],
        }
      ]
    }
  }

  cardStyle = {
    height: "500px",
    width: "400px"
  }
  
  render() {
    const { classes } = this.props;
    return (
      <Card style={this.cardStyle}>
        <List className={classes.root}>
          {this.state.fakeData.map(chat => {
            return <ChatListItem classes={classes} chatroomName={chat.chatroomName} userNames={chat.users} latestMessage={chat.messages[0]} />
          })}
        </List>
      </Card>
    );
  }
}

ChatList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatList);