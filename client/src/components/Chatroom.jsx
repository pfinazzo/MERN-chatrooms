import React, { Component } from 'react';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';

export default class Chatroom extends Component {
  wrapStyle = {
    textAlign: 'center',
    width: "400px", 
    margin: "0 auto"
  }

  cardStyle = {
    height: "500px"
  }

  render() {
    return (
      <div style={this.wrapStyle}>
        <Card style={this.cardStyle}>
          <CardContent />
        </Card>
      </div>
    )
  }
}