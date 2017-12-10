import React from 'react';
import { Button,Table } from 'semantic-ui-react'

class SystemTag extends React.Component {
	render() {
		const name = this.props.tag.name;
		return (
			<Table.Row>
				<Table.Cell collapsing>
					<Button>{"Remove"}</Button>
				</Table.Cell>
				<Table.Cell>
					{name}
				</Table.Cell>
			</Table.Row>
		)
	}
}

export default SystemTag
