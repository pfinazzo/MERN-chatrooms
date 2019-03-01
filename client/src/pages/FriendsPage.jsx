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

  fetchData = () => {
    axios.get('/friends').then(res => {
      if (res.data === "not good"){
        console.log(res.statusText)
        localStorage.clear();
        this.props.history.push('/login');
      }
      console.log(res);
      let friends = res.data;
      this.setState({friends});
    }).catch(err => {
      if (err) throw err; 
    })
  }
  componentWillMount(){
    this.fetchData();
  }

  render(){
    return(
      <Grid justify="center" alignContent="space-evenly">
          <NavBar {...this.props}/>
          <h1 style={this.headerStyle}>Friends</h1>
          <FriendList fetchData={this.fetchData} friends={this.state.friends} />
      </Grid>
    )
  }
}