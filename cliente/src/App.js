import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login.js';
import Signup from "./Pages/Signup";
import { NoMatch } from './components/NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import ProtectedRoute from './components/ProtectedRoute';
import Query from "./Pages/Query";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Login:false
    };
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Jumbotron />
          <Layout>
            <Switch>
              <ProtectedRoute exact path="/" loggedIn={this.state.Login} component={Home} />
              <ProtectedRoute  path="/query" loggedIn={this.state.Login} component={Query} />
              <Route path="/Login" component={Login} />
              <Route path="/Signup" component={Signup} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
