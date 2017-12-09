import React from 'react';
import { Icon, Label, Menu, Table, Input, table, thead, tr } from 'semantic-ui-react'

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
    if(systems) {
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
    } else {
      return (<div></div>)
    }

  }
}

export default SystemsTable;


/*
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
*/
