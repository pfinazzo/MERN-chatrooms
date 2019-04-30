import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Dashboard from './pages/Dashboard';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CreateChatroomForm from './pages/CreateChatroomForm';
import AddFriend from './pages/AddFriend';
import RequestsPage from './pages/RequestsPage';
import FriendsPage from './pages/FriendsPage';
import axios from 'axios';
import LoadingSign from './components/LoadingSign';

export default class App extends Component {
  state = {
    user: null
  }

  setUserData = (user, cb) => {
    if (!user) {
      axios.get('/users/authorized', { withCredentials: true }).then(result => {
        let user = result.data;
        if (user.username) {
          this.setState({ user }, cb);
        } else {
          this.setState({ user });
        }
      }).catch(err => {
        if (err) {
          console.error(err);
        }
      })
    } else {
      this.setState({ user }, cb);
    }
  }

  componentWillMount() {
    setTimeout(() => {
      axios.get('/users/authorized', { withCredentials: true }).then(({ data: { user } }) => {
        this.setUserData(user, () => {
          console.log(this.state)
        })
      })
    }, 1000)
  }


  render() {
    if (!this.state.user) {
      return (<Grid container spacing={24} justify="center" alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <div style={this.wrapStyle}>
            <h1 style={{ textAlign: "center" }}>loading...</h1>
            <LoadingSign />
          </div>
        </Grid>
      </Grid>)
    } else {
      return (
        <Switch>
          <Route exact path="/" render={(props) => this.state.user.username ? <Dashboard setUserData={this.setUserData} user={this.state.user} {...props} /> : <LoginPage setUserData={this.setUserData} {...props} />} />
          <Route path="/signup" render={(props) => <SignUpPage setUserData={this.setUserData} {...props} />} />
          <Route path="/login" render={(props) => <LoginPage setUserData={this.setUserData} {...props} />} />
          <Route exact path="/create" render={(props) => this.state.user.username ? <CreateChatroomForm user={this.state.user} {...props} /> : <LoginPage setUserData={this.setUserData} {...props} />} />
          <Route exact path="/add-friend" render={(props) => this.state.user.username ? <AddFriend user={this.state.user} {...props} /> : <LoginPage setUserData={this.setUserData} {...props} />} />
          <Route exact path="/requests" render={(props) => this.state.user.username ? <RequestsPage user={this.state.user} {...props} /> : <LoginPage setUserData={this.setUserData} {...props} />} />
          <Route exact path="/friends" render={(props) => this.state.user.username ? <FriendsPage user={this.state.user} {...props} /> : <LoginPage setUserData={this.setUserData} {...props} />} />
        </Switch>
      )
    }
  }
}