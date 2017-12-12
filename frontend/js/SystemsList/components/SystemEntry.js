import React from 'react';
import { Table } from 'semantic-ui-react'

class SystemEntry extends React.Component {
	render() {
		const system = this.props.system;
		const id = this.props.system.id;
		return (
			<Table.Row>
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

export default SystemEntry
