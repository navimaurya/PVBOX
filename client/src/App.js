import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';

import { getLoggedInUserStart } from './redux/user/user-action';
import Auth from './pages/auth/authPage';
import AppStarter from './App-starter';

import './App.css';

class App extends Component {

  componentDidMount() {
    const { getLoggedInUser } = this.props;
    getLoggedInUser();
  }
  render() {
    const { isLogedIn } = this.props;
    return (
      <>
        <Switch>
          {
            isLogedIn ? <AppStarter />

              :
              <Route path='/' component={Auth} />
          }
        </Switch>

      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLoggedInUser: () => dispatch(getLoggedInUserStart()),
})
const mapStateToProps = state => ({
  isLogedIn: state.user.currentUser
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
