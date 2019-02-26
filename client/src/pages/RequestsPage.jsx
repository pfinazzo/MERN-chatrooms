import React, {Component} from 'react';
import NavBar from './../components/NavBar';
import axios from 'axios';


export default class RequestsPage extends Component{
  state = {}

  componentWillMount(){
    axios.get('/users/received-friend-requests').then(res => {
      console.log(res);
      let receivedRequests = res.data;
      this.setState({receivedRequests}, () => {
        axios.get('/users/sent-friend-requests').then(res => {
          let sentRequests = res.data;
          this.setState({sentRequests})
        }).catch(err => {
          if (err) throw err;
        })
      })
    }).catch(err => {
      if (err) throw err;
    })
  }
  render(){
    return (
      <div>
        <NavBar {...this.props}/>
        requests
      </div>
    )
  }
}