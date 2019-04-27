import React, { Component } from 'react';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import TextField from '@material-ui/core/TextField/TextField';
import Paper from '@material-ui/core/Paper/Paper';
import StandardButton from './StandardButton';



export default class Chatroom extends Component {
  state = {
    currentMessage: '',
    messages: [{
      text: "yo yo yo",
      username: "fakeuser123",
    }]
  }

  wrapStyle = {
    textAlign: 'center',
    width: "400px",
    margin: "0 auto"
  }

  cardStyle = {
    height: "500px"
  }

  inputWrapperStyle = {
    position: "absolute",
    bottom: 40,
    display: "flex",
    width: "400px",
    justifyContent: "space-evenly"
  }

  inputStyle = {
    width: "70%"
  }

  buttonStyle = {
    width: "31%"
  }

  cardContentStyle = {
    height: "100%",
    padding: "0px",
    width: "100%"
  }


  componentDidMount() {
    console.log(this.props);
  }

  handleInputChange = ({ target: { value } }, key) => this.setState({ [key]: value }, () => console.log(this.state));

  formValid = () => !!this.state.currentMessage;

  handleSubmit = (e) => {
    e.preventDefault();
    let messages = [...this.state.messages];
    messages.unshift({ text: this.state.currentMessage, username: this.props.username });
    this.setState({ messages }, () => console.log(this.state));
  }

  messagesWrapperStyle = {
    height: "80%",
    width: "100%",
    display: "flex",
    flexDirection: "column-reverse",
    overflow: "scroll"
  }

  messageStyle = {
    margin: "20px",
    height: "30px",
    display: "flex",
    justifyContent: "flex-start",
    padding: "10px",
    verticalAlign: "center",
    backgroundColor: "lightblue",
  }

  userMessageStyle = {
    margin: "20px",
    height: "30px",
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px",
    verticalAlign: "center",
    backgroundColor: "lightgreen"
  }

  render() {
    return (
      <div style={this.wrapStyle}>
        <Card style={this.cardStyle}>
          <CardContent style={this.cardContentStyle}>
            <div style={this.messagesWrapperStyle}>
              {this.state.messages.map(message => message.username === this.props.username ?
                <Paper style={this.userMessageStyle}>{message.text} - {message.username}</Paper> :
                <Paper style={this.messageStyle}>{message.username} - {message.text} </Paper>)}
            </div>
            <form onSubmit={this.handleSubmit} action="">
              <div style={this.inputWrapperStyle}>
                <TextField onChange={e => this.handleInputChange(e, "currentMessage")} style={this.inputStyle} />
                <StandardButton callback={this.handleSubmit} formValid={this.formValid()}>Submit</StandardButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }
}