import React from 'react';
import { Table } from 'semantic-ui-react'

class GroupsEntry extends React.Component {
	render() {
		const group = this.props.group;
		const id = group.systemgroup_id;
		return (
			<Table.Row>
				<Table.Cell selectable> <a href={'/group/' + id}>{group.name}</a></Table.Cell>
				<Table.Cell selectable> <a href={'/group/' + id}>{group.manager}</a></Table.Cell>
			</Table.Row>
		)
	}
}

export default GroupsEntry
