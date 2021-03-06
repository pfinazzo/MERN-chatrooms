import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const wrapStyle = {
  textAlign: 'center'
}

class StandardButton extends Component{

  formValid = () => {
    return !this.props.formValid;
  }
  render(){
    let { classes, callback} = this.props;
    
  return (
    <div style={wrapStyle}>
      <Button disabled={this.formValid()} onClick={callback} variant="contained" color="primary" className={classes.button}>
        Submit
      </Button>
    </div>
  );
}

}

StandardButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StandardButton);
