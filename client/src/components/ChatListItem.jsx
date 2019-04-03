import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';

let latestMessageStyle = {
  float: 'right',
  fontSize: '10px',
  marginTop: '-18px',
  height: '50%',
  width: '30%',
}

let listItemStyle = {
  borderBottom: "1px solid black",
  width: "100%"
}


function ChatListItem(props) {
  const { classes, chatroomName, userNames, latestMessage } = props,
    { text, from } = latestMessage,
    userListString = `${userNames[0].toString()}, ${userNames[1].toString()} ...`;


  return (
    <ListItem style={listItemStyle} alignItems="flex-start">
      {/* will use avatar later when user can upload photo file, probably with gridfs */}
      {/* <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar> */}
      <ListItemText
        primary={chatroomName}
        secondary={
          <>
            <Typography component="span" className={classes.inline} color="textPrimary">
              {userListString}
            </Typography>
            <div style={latestMessageStyle}>
              {`from: ${from}`}
              {` - ${text}`}
            </div>
          </>
        }
      />
    </ListItem>
  )
}

export default ChatListItem;