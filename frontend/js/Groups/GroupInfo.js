import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Navbar from '../SystemsList/components/Navbar';

import { Icon, Label, Menu, Table, Input, Button } from 'semantic-ui-react';

import GroupSystemTable from './components/GroupSystemTable';
import UserTable from './components/UserTable';
import { getGroupInfo, getGroupUsers } from './actions/GroupsActions';

class GroupInfo extends React.Component {
	render() {
		return (
      <div>
			<Navbar/>
        <h1>{"Systems In Group"}</h1>
  			<GroupSystemTable id={this.props.params.id}/>
          <h1>{"Users In Group"}</h1>
          <UserTable id={this.props.params.id}/>
      </div>
		)
	}
}

function mapStateToProps(state) {
  return {
    data: state.groups
  };
}



export default GroupInfo
