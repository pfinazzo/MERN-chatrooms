import React, {Component} from 'react';
import NavBar from './../components/NavBar';
import axios from 'axios';
import Grid from '@material-ui/core/Grid/Grid';
import FriendRequest from './../components/FriendRequest';


export default class RequestsPage extends Component{
  state = {
    receivedRequests : [],
    sentRequests: []
  }

  componentWillMount(){
    axios.get('/users/received-friend-requests').then(res => {
      console.log(res);
      let receivedRequests = res.data;
      this.setState({receivedRequests}, () => {
        axios.get('/users/sent-friend-requests').then(res => {
          let sentRequests = res.data;
          this.setState({sentRequests}, () => {
            console.log(this.state);
          });
        }).catch(err => {
          if (err) throw err;
        })
      })
    }).catch(err => {
      if (err) throw err;
    })
  }

  headerStyle = {
    width: "100%",
    textAlign: "center"
  }

  render(){
    let {state, headerStyle, props} = this,
    {receivedRequests, sentRequests} = state;
    return (
      <div>
        <NavBar {...props}/>
        <h1 style={headerStyle}>Requests</h1>
        <Grid container spacing={24} justify="center" alignContent="center" alignItems="center">
          <Grid item xs={6}>
            <h2 style={headerStyle}>Received</h2>
            {receivedRequests.map(request => {
              return <FriendRequest header={request.username} text="Add user?"/>
            })}
          </Grid>
          <Grid item xs={6}>
          <h2 style={this.headerStyle}>Sent</h2>
            {sentRequests.map(request => {
              return <FriendRequest header={request.username} text="pending request"/>
            })}
          </Grid>
        </Grid>
      </div>
    )
  }
}