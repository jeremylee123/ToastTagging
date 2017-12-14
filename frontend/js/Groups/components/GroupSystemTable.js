import React from 'react';
import { Icon, Label, Menu, Table, Input, table, thead, tr, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

import GroupSystemEntry from './GroupSystemEntry';
import { getGroupInfo, AddSystemToGroup } from '../actions/GroupsActions';

class GroupSystemTable extends React.Component {
  componentWillMount() {
    this.props.getGroupInfo(this.props.id);
  }

  onUserInput(e) {
    this.setState({userInput: e.target.value});
  }

  onAddSystem() {
    this.props.AddSystemToGroup(this.props.id, this.state.userInput);
  }

  render() {
    const systems = this.props.data.groupInfo;
    if(systems) {
      return (
        <div>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{"Remove From Group"}</Table.HeaderCell>
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
              <GroupSystemEntry groupId={this.props.id}
                system={system}
              />
            )}
          </Table.Body>
        </Table>
        <Button icon label={"add system"} onClick={this.onAddSystem.bind(this)}>
          <Icon name='plus' />
        </Button>
        <Input focus placeholder='System id...' onChange={this.onUserInput.bind(this)}/>
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
    AddSystemToGroup: (group, userinput) => {
      dispatch(AddSystemToGroup(group,userinput));
    },
    getGroupInfo: (id) => {
      dispatch(getGroupInfo(id));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupSystemTable);
