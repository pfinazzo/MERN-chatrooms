
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Tab from '@material-ui/core/Tab/Tab';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
    height: "20px",
    width: "35px"
  }
});

let wrapperStyle = {
  display: "flex",
  justifyContent: "center",
  height: "100%",
  width: "100%"
}
function NewChatroomNavButton(props) {
  const { classes } = props;
  return (
    <div className="wrapper" style={wrapperStyle}>
      <Tooltip title="Add" aria-label="Add">
        <Fab color="secondary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
      </div>
  );
}

NewChatroomNavButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewChatroomNavButton);
