import React, { Component } from 'react';
import NavBar from './../components/NavBar';
import axios from 'axios';
import Grid from '@material-ui/core/Grid/Grid';
import FriendRequest from './../components/FriendRequest';
import LoadingSign from './../components/LoadingSign';


export default class RequestsPage extends Component {
  state = {
    receivedRequests: [],
    sentRequests: [],
    finished: false
  }

  fetchData = () =>{
    axios.get('/friends/received-friend-requests', {withCredentials: true}).then(res => {
      if (res.data === "no user"){
        this.props.history.push('/login');
      }
      let receivedRequests = res.data;
      this.setState({ receivedRequests }, () => {
        axios.get('/friends/sent-friend-requests', {withCredentials: true}).then(res => {
          let sentRequests = res.data;
          this.setState({ sentRequests }, () => {
            setTimeout(() => {
              this.setState({
                finished: true
              })
            }, 700)
          });
        }).catch(err => {
          if (err) throw err;
        })
      })
    }).catch(err => {
      if (err) throw err;
    })
  }

  componentWillMount() {
    this.fetchData();
  }

  reload = () => {
    this.fetchData();
  }

  headerStyle = {
    width: "100%",
    textAlign: "center"
  }

  wrapStyle = {
    marginTop: "20%"
  }

  render() {
    let { state, headerStyle, props } = this,
      { receivedRequests, sentRequests } = state,
      renderedReceived = receivedRequests.length ?
        receivedRequests.map(request => {
          if (request.username){
            return <Grid item xs="12"><FriendRequest reload={this.reload} _id={request._id} received={true} header={request.username} text="Accept user?" /></Grid>
          } else {
            return <Grid item xs="12"><FriendRequest header={"No friend requests received.. "} text="if someone adds you as a friend it will show up here  " /></Grid>
          }
        }) :
        <Grid item xs="12"><FriendRequest header={"No friend requests received.. "} text="if someone adds you as a friend it will show up here  " /></Grid>,

      renderedSent = sentRequests.length ?
        sentRequests.map(request => <Grid item xs="12"><FriendRequest reload={this.reload} _id={request._id} header={request.username} text="pending acceptance" /></Grid>) :
        <Grid item xs="12"><FriendRequest header={"No friend requests sent"} text="if you add a friend, your request will show up here until they accept or decline it" /></Grid>;


    if (!this.state.finished) {
      return (
      <Grid container spacing={24} justify="center" alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <div style={this.wrapStyle}>
            <h1 style={headerStyle}>loading...</h1>
            <LoadingSign />
          </div>
        </Grid>
      </Grid>
      )
    } else {
      return (
        <div>
          <NavBar {...props} />
          <h1 style={headerStyle}>Requests</h1>
          <Grid container spacing={24} justify="center" alignContent="center" alignItems="center">
            <Grid item xs={6}>
              <h2 style={headerStyle}>Received</h2>
              <Grid container justify="center" alignContent="center" alignItems="center">
                {renderedReceived}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <h2 style={this.headerStyle}>Sent</h2>
              <Grid container justify="center" alignContent="center" alignItems="center">
                {renderedSent}
              </Grid>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
}