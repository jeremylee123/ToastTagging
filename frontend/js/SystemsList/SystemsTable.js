import React from 'react';
import { Icon, Label, Menu, Table, Input } from 'semantic-ui-react'

import SystemEntry from './SystemEntry';

class SystemsTable extends React.Component {
  constructor(props) {
	super(props);
	this.state = {page: 1};
	}
  // paginate(x) {
  // TODO
  // }
  render() {
    const systems = this.props.systems;
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{"Serial Number"}</Table.HeaderCell>
            <Table.HeaderCell>{"System Name"}</Table.HeaderCell>
            <Table.HeaderCell>{"Company Name"}</Table.HeaderCell>
            <Table.HeaderCell>{"Product Family"}</Table.HeaderCell>
            <Table.HeaderCell>{"Model"}</Table.HeaderCell>
            <Table.HeaderCell>{"OS Version"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {systems.map(system =>
    				<SystemEntry
    					system={system}
    				/>
    			)}
        </Table.Body>
      </Table>
    )
  }
}

export default SystemsTable;
