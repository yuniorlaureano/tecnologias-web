import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from "./Pages/Signup";
import { NoMatch } from './components/NoMatch';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import ProtectedRoute from './components/ProtectedRoute';
import Query from "./Pages/Query";
import Beneficiarios from "./Pages/Beneficiarios";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Jumbotron />
          <Layout>
            <Switch>
              <ProtectedRoute exact path="/" loggedIn={true}  component={Home} />
              <ProtectedRoute  path="/query"  component={Query} />
              <Route path="/Login" component={Login} />
              <Route path="/Signup" component={Signup} />
              <Route exact path="/beneficiarios" component={Beneficiarios} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
