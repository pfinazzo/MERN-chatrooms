import React, {Component} from 'react';
import NavBar from './../components/NavBar';
import FriendList from './../components/FriendList';
import Grid from '@material-ui/core/Grid/Grid';
import axios from 'axios';

export default class FriendsPage extends Component{
  state = {
    friends: []
  };

  headerStyle = {
    textAlign: "center"
  }

  getFriends = () => {
    axios.get('/friends', {withCredentials: true}).then(res => {
      console.log(res);
      if (res.data === "no user"){
        this.props.history.push('/login');
      }
      let friends = res.data;
      this.setState({friends});
    }).catch(err => {
      if (err) throw err; 
    })
  }
  componentWillMount(){
    this.getFriends();
  }

  render(){
    return(
      <Grid justify="center" alignContent="space-evenly">
          <NavBar {...this.props}/>
          <h1 style={this.headerStyle}>Friends</h1>
          <FriendList getFriends={this.getFriends} friends={this.state.friends} />
      </Grid>
    )
  }
}