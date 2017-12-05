import React from 'react';
import { Icon, Label, Menu, Table, Input } from 'semantic-ui-react'

import SystemEntry from './SystemEntry';

export default class SystemsTable extends React.Component {
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

/*
<Table.Footer>
<Table.Row>
<Table.HeaderCell colSpan='3'>
  {if(this.state.page > 1) {
    <Menu floated='right' pagination>
      <Menu.Item as='a' icon onClick={this.paginate(1)}>
        <Icon name='left chevron' />
      </Menu.Item>
  }}
    // <Input classname='paginationInput' onClick={this.paginate()}/>
    <Menu.Item as='a' icon onClick={this.paginate(-1)}>
      <Icon name='right chevron' />
    </Menu.Item>
  </Menu>
</Table.HeaderCell>
</Table.Row>
</Table.Footer>
*/
