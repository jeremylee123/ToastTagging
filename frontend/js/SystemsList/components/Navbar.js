import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

class Navbar extends React.Component {
  OnNavigateToSytemsList() {
    console.log('forwardTo: ' + '/systemslist');
    browserHistory.push('/systemslist');

  }
  OnNavigateToGroupsList() {
    console.log('forwardTo: ' + '/listgroups');
    browserHistory.push('/listgroups')
  }
  onLogOut() {
    browserHistory.push('/logout');
  }
  render() {
    return (
      <div>
        <Menu>
          <Menu.Item
            name='Systems'
            onClick={this.OnNavigateToSytemsList}
          >
          Systems
          </Menu.Item>
         <Menu.Item
           name='Systems Groups'
           onClick={this.OnNavigateToGroupsList}
         >
           Systems Group
         </Menu.Item>
         <Menu.Menu position='right'>
           <Menu.Item name='logout' onClick={this.onLogOut} />
         </Menu.Menu>
       </Menu>
      </div>
    );
  }
}

export default Navbar;
