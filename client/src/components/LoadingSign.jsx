import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class CircularDeterminate extends React.Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  wrapStyle = {
    textAlign: "center"
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={this.wrapStyle}>
        <CircularProgress
          className={classes.progress}
          variant="determinate"
          value={this.state.completed}
        />
      </div>
    );
  }
}

CircularDeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularDeterminate);