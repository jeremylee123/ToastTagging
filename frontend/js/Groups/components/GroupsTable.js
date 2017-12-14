import React from 'react';
import { Icon, Label, Menu, Table, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

import GroupsEntry from './GroupsEntry';
import { getGroups, CreateGroup } from '../actions/GroupsActions';

class GroupsTable extends React.Component {
  onUserInput(e) {
    this.setState({userInput: e.target.value});
  }

  onCreateGroup() {
    CreateGroup(this.state.userInput);
    this.props.getGroupsList();
  }
  render() {
    const groups = this.props.groups;
    if(groups) {
      return (
        <div>
          <h1>{"Groups I manage"}</h1>
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{"Name"}</Table.HeaderCell>
                <Table.HeaderCell>{"Manager"}</Table.HeaderCell>
                <Table.HeaderCell>{"Delete Group"}</Table.HeaderCell>
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
          <Button icon label={"Create Group To Manage"} onClick={this.onCreateGroup.bind(this)}>
            <Icon name='plus' />
          </Button>
          <Input focus placeholder='Group name' onChange={this.onUserInput.bind(this)}/>
            <h1>{"Groups I am a part of"}</h1>
              <Table celled selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>{"Name"}</Table.HeaderCell>
                    <Table.HeaderCell>{"Manager"}</Table.HeaderCell>
                    <Table.HeaderCell>{"Remove Myself"}</Table.HeaderCell>
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
        </div>
      )
    } else {
      return (<div></div>)
    }

  }
}
function mapStateToProps(state) {
  return {
    data: state.groups
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGroupsList: () => {
      dispatch(getGroups());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsTable);