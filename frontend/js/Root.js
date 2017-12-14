import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import PropTypes from 'prop-types';

// Import the components used as pages
import LoginPage from './Login/LoginPage';
import GroupsPage from './Groups/GroupsPage';
import GroupInfo from './Groups/GroupInfo';
import NotFound from './NotFound';
import SystemsListPage from './SystemsList/SystemsListPage';
import SystemInfoPage from './SystemInfo/SystemInfoPage';

function requireAuthStateClosure(store) {
  return (nextState, replace) => {
    let { loggedIn } = store.getState().login;
    if (!loggedIn) {
      replace({
        pathname: '/login'
      });
    }
  };
}

function logout(store) {
  return (nextState, replace) => {
    localStorage.token = "";
      replace({
        pathname: '/login'
      });
      browserHistory.push('/login');
  }
}

const Root = ({ store }) => (
  <Provider store={store}>
  <Router history={browserHistory}>
      <Route path="/logout" onEnter={logout(store)} />
      <Route path="/group:id" onEnter={requireAuthStateClosure(store)} component={GroupInfo}/>
      <Route path="/listgroups" onEnter={requireAuthStateClosure(store)} component={GroupsPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/systemslist" onEnter={requireAuthStateClosure(store)} component={SystemsListPage} />
      <Route path="/" onEnter={requireAuthStateClosure(store)} component={SystemsListPage} />
      <Route path="/system:serialNumber" onEnter={requireAuthStateClosure(store)} component={SystemInfoPage} />
      <Route path="*" component={NotFound} />
  </Router>
  </Provider>
)
Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
