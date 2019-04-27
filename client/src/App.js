import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CreateChatroomForm from './pages/CreateChatroomForm';
import AddFriend from './pages/AddFriend';
import RequestsPage from './pages/RequestsPage';
import FriendsPage from './pages/FriendsPage';
import axios from 'axios';

export default class App extends Component {
  state = {
    user: null
  }

  setUserData = (user, cb) => {
    if (!user) {
      axios.get('/users/authorized').then(result => {
        let user = result.data;
        this.setState({ user }, cb);
      }).catch(err => {
        if (err) throw err;
      })
    } else {
      this.setState({ user }, cb);
    }
  }

  componentDidMount() {
    axios.get('/users/authorized').then(({data: {user}}) => {
      this.setUserData(user, () => {
        console.log(this.state);
      })
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={(props) => this.state.user ? <Dashboard setUserData={this.setUserData} user={this.state.user} {...props} /> : <LoginPage setUserData={this.setUserData} {...props} />} />
          <Route path="/signup" render={(props) => <SignUpPage setUserData={this.setUserData} {...props} />} />
          <Route path="/login" render={(props) => <LoginPage setUserData={this.setUserData} {...props} />} />
          <Route exact path="/create" render={(props) => this.state.user ? <CreateChatroomForm user={this.state.user} {...props} /> : <LoginPage setUserData={this.setUserData} {...props} />} />
          <Route exact path="/add-friend" render={(props) => this.state.user ? <AddFriend user={this.state.user} {...props} /> : <LoginPage setUserData={this.setUserData} {...props} />} />
          <Route exact path="/requests" render={(props) => this.state.user ? <RequestsPage user={this.state.user} {...props} /> : <LoginPage setUserData={this.setUserData} {...props} />} />
          <Route exact path="/friends" render={(props) => this.state.user ? <FriendsPage user={this.state.user} {...props} /> : <LoginPage setUserData={this.setUserData} {...props} />} />
        </div>
      </Router>
    )
  }
}