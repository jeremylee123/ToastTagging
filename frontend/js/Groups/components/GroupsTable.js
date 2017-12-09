import React from 'react';
import { Icon, Label, Menu, Table, Input } from 'semantic-ui-react'

import GroupsEntry from './GroupsEntry';

class GroupsTable extends React.Component {
  render() {
    const groups = this.props.groups;
    if(groups) {
      return (
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{"Name"}</Table.HeaderCell>
              <Table.HeaderCell>{"Manager"}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {groups.map(group =>
      				<GroupsEntry
      					group={group}
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

export default GroupsTable;
