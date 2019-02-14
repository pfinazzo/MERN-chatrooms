import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

export default class App extends Component {
  render(){
    return (
      <Router>
        <div>
        <Route exact path="/" render={(props) => <Home {...props}/>}/>
        <Route path="/signup" render={(props) => <SignUpPage {...props}/>}/>
        <Route path="/login" render={(props) => <LoginPage {...props}/>}/>
      </div>
      </Router>
    )
  }
}