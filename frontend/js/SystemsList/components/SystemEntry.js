import React from 'react';
import { Table } from 'semantic-ui-react'

class SystemEntry extends React.Component {
	render() {
		const system = this.props.system;
		return (
			<Table.Row>
				<Table.Cell>{system.serialNumber}</Table.Cell>
				<Table.Cell>{system.systemName}</Table.Cell>
				<Table.Cell>{system.companyName}</Table.Cell>
				<Table.Cell>{system.productFamily}</Table.Cell>
				<Table.Cell>{system.model}</Table.Cell>
				<Table.Cell>{system.osVersion}</Table.Cell>
			</Table.Row>
		)
	}
}

export default SystemEntry
