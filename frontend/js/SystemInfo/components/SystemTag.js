import React from 'react';
import { Button,Table } from 'semantic-ui-react'

class SystemTag extends React.Component {
	render() {
		const tagID = this.props.tagID;
		return (
			<Table.Row>
				<Table.Cell collapsing>
					<Button>{"Remove Tag"}</Button>
				</Table.Cell>
				<Table.Cell>
					{id}
				</Table.Cell>
				<Table.Cell>
					{name}
				</Table.Cell>
				<Table.Cell>
					{user_id}
				</Table.Cell>
			</Table.Row>
		)
	}
}

export default SystemTag
