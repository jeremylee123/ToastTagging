import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import PropTypes from 'prop-types';

// Import the components used as pages
import LoginPage from './Login/LoginPage';
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

const Root = ({ store }) => (
  <Provider store={store}>
  <Router history={browserHistory}>
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
