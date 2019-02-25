import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends Component {

  componentDidMount(){
    console.log('modal mounted');
  }

  componentWillUnmount() {
    console.log('modal unmouted');
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children
    );
  }
}
