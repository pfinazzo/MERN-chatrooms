import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CreateChatroomForm from './pages/CreateChatroomForm';
import {getUserData} from './utilities/userData';
import AddFriend from './pages/AddFriend';
import RequestsPage from './pages/RequestsPage';
import FriendsPage from './pages/FriendsPage';

export default class App extends Component {
  state = {
    user: null
  }

  componentWillMount(){
    const user = getUserData();
    this.setState({user})
  }

  componentWillUnmount(){
    localStorage.clear(); // just for development
  }

  setUserData = (user, cb) => {
    this.setState({user}, cb);
  }

  render(){
    return (
      <Router>
        <div>
        <Route exact path="/" render={(props) => this.state.user ? <Dashboard user={this.state.user} {...props}/> : <LoginPage  setUserData={this.setUserData} {...props}/>}/>
        <Route path="/signup" render={(props) => <SignUpPage setUserData={this.setUserData} {...props}/>}/>
        <Route path="/login" render={(props) => <LoginPage setUserData={this.setUserData} {...props}/>}/>
        <Route exact path="/create" render={(props) => this.state.user ? <CreateChatroomForm user={this.state.user} {...props}/> : <LoginPage  setUserData={this.setUserData} {...props}/>}/>
        <Route exact path="/add-friend" render={(props) => this.state.user ? <AddFriend user={this.state.user} {...props}/> : <LoginPage  setUserData={this.setUserData} {...props}/>}/>
        <Route exact path="/requests" render={(props) => this.state.user ? <RequestsPage user={this.state.user} {...props}/> : <LoginPage  setUserData={this.setUserData} {...props}/>}/>
        <Route exact path="/friends" render={(props) => this.state.user ? <FriendsPage user={this.state.user} {...props}/> : <LoginPage  setUserData={this.setUserData} {...props}/>}/>
      </div>
      </Router>
    )
  }
}