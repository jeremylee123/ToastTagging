import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

import GroupsTable from './components/GroupsTable';

import { getGroups } from './actions/GroupsActions';

class GroupsPage extends React.Component {
  componentWillMount() {
    this.props.getGroupsList();
  }
  handleForwardToSystemsGroup() {
    console.log('forwardTo(/systemsgroup)');
    browserHistory.push('/systemsgroup');
  }
	render() {
		return (
      <div>
        <Menu>
          <Menu.Item
            name='Systems'
          >
          Systems
          </Menu.Item>
         <Menu.Item
           name='Systems Groups'
           onClick={this.handleForwardToSystemsGroup}
         >
           Systems Group
         </Menu.Item>
       </Menu>
  			<GroupsTable group={this.props.data.groups.groups} isLoading={this.props.data.currentlyLoading}/>
      </div>
		)
	}
}

function mapStateToProps(state) {
  return {
    data: state.groups
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGroupsList: () => {
      dispatch(getGroups());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage)
