import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react'
import { DeleteGroup, getGroups} from '../actions/GroupsActions';
import { connect } from 'react-redux';

class GroupsEntryManager extends React.Component {
	onDeleteGroup() {
		this.props.DeleteGroup(this.props.group.id);
	}
	render() {
		const group = this.props.group;
		const id = group.id;
		return (
			<Table.Row>
				<Table.Cell selectable> <a href={'/group' + id}>{group.name}</a></Table.Cell>
				<Table.Cell selectable> <a href={'/group' + id}>{group.manager}</a></Table.Cell>
				<Table.Cell selectable><Button icon onClick={this.onDeleteGroup.bind(this)}>
					<Icon name='minus' />
				</Button></Table.Cell>
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
		DeleteGroup: (id) => {
      dispatch(DeleteGroup(id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupsEntryManager)
