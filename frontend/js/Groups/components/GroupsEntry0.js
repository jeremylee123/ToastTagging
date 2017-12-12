import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react'

class GroupsEntry extends React.Component {
	render() {
		const group = this.props.group;
		console.log(group);
		const id = group.id;
		return (
			<Table.Row>
				<Table.Cell selectable> <a href={'/group' + id}>{group.name}</a></Table.Cell>
				<Table.Cell selectable> <a href={'/group/' + id}>{group.manager}</a></Table.Cell>
				<Table.Cell selectable><Button icon>
					<Icon name='minus' />
				</Button></Table.Cell>
			</Table.Row>
		)
	}
}

export default GroupsEntry
