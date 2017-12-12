import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react'
import {RemoveUserFromGroup, getGroupUsers} from '../actions/GroupsActions';
import { connect } from 'react-redux';

class GroupUserEntry extends React.Component {
	onRemoveUser() {
		RemoveUserFromGroup(this.props.groupId, this.props.user.user_id);
		this.props.getGroupUsers(this.props.groupId);
	}
	render() {
		console.log(user);
		const user = this.props.user;
		return (
			<Table.Row>
      <Table.Cell selectable><Button icon onClick={this.onRemoveUser.bind(this)}>
        <Icon name='minus' />
      </Button></Table.Cell>
				<Table.Cell>{user.username}</Table.Cell>
			</Table.Row>
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
    getGroupUsers: (id) => {
      dispatch(getGroupUsers(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupUserEntry);
