import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react'
import { RemoveMyselfFromGroup, getGroups} from '../actions/GroupsActions';
import { connect } from 'react-redux';

class GroupsEntryUser extends React.Component {
	onRemoveMyself() {
		this.props.RemoveMyselfFromGroup(this.props.group.id);
	}
	render() {
		const group = this.props.group;
		const id = group.id;
		return (
			<Table.Row>
				<Table.Cell selectable> <a href={'/group' + id}>{group.name}</a></Table.Cell>
				<Table.Cell selectable> <a href={'/group/' + id}>{group.manager}</a></Table.Cell>
				<Table.Cell selectable><Button icon onClick={this.onRemoveMyself.bind(this)}>
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
		RemoveMyselfFromGroup: (id) => {
      dispatch(RemoveMyselfFromGroup(id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupsEntryUser)
