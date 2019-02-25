import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: deepOrange[800],
    },
  },
});

function CreateButton(props) {
  const { classes, callback } = props;
  return (
    <Button onClick={() => callback()} >
      <Icon className={classes.icon} color="primary">
        add_circle
      </Icon>
    </Button>
  );
}

CreateButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateButton);