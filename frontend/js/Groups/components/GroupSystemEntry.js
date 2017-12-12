import React from 'react';
import { Table, Icon, Button  } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getGroupInfo, RemoveSystemFromGroup } from '../actions/GroupsActions';

class GroupSystemEntry extends React.Component {
	onRemoveSystem() {
		RemoveSystemFromGroup(this.props.groupId,this.props.system.id);
		this.props.getGroupInfo(this.props.groupId);
	}
	render() {
		const system = this.props.system;
		const id = this.props.system.id;
		return (
			<Table.Row>
			<Table.Cell selectable><Button icon onClick={this.onRemoveSystem.bind(this)}>
				<Icon name='minus' />
			</Button></Table.Cell>
				<Table.Cell selectable> <a href={'/system/' + id}>{system.serialNumber} </a></Table.Cell>
				<Table.Cell selectable> <a href={'/system/' + id}>{system.systemName} </a></Table.Cell>
				<Table.Cell selectable> <a href={'/system/' + id}> {system.companyName} </a></Table.Cell>
				<Table.Cell selectable> <a href={'/system/' + id}>{system.productFamily}</a></Table.Cell>
				<Table.Cell selectable> <a href={'/system/' + id}>{system.model}</a></Table.Cell>
				<Table.Cell selectable> <a href={'/system/' + id}>{system.osVersion}</a></Table.Cell>
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
		getGroupInfo: (id) => {
			dispatch(getGroupInfo(id));
		}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSystemEntry)
