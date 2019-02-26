import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: "10% auto",
    width: "80%",
  },
});

function FriendRequest(props) {
  const { classes, header, text } = props;

  return (
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          {header}
        </Typography>
        <Typography component="p">
          {text}
        </Typography>
      </Paper>
  );
}

FriendRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FriendRequest);