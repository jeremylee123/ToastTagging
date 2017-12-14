import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

import GroupsTable from './components/GroupsTable';
import Navbar from '../SystemsList/components/Navbar';

import { getGroups } from './actions/GroupsActions';

class GroupsPage extends React.Component {
  componentWillMount() {
    this.props.getGroupsList();
  }

	render() {
    // console.log("From groupsPage:");
    // console.log(this.props.data);
		return (
      <div>
        <Navbar/>
  			<GroupsTable groups={this.props.data} isLoading={this.props.data.currentlyLoading}/>
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
