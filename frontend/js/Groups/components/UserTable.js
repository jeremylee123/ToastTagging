import React from 'react';
import { Icon, Label, Menu, Table, Input, table, thead, tr, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';


import { getGroupUsers, AddGroupUsers} from '../actions/GroupsActions';
import GroupUserEntry from './GroupUserEntry';

class UserTable extends React.Component {
  componentWillMount() {
    this.props.getGroupUsers(this.props.id);
  }

  onUserInput(e) {
    this.setState({userInput: e.target.value});
  }

  onAddUser() {
    this.props.AddGroupUsers(this.props.id, this.state.userInput);
  }

  render() {
    const users = this.props.data.groupUserInfo;
    if(users) {
      return (
        <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{"Remove From Group"}</Table.HeaderCell>
              <Table.HeaderCell>{"User"}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map(u =>
              <GroupUserEntry groupId={this.props.id}
                user={u}
              />
            )}
          </Table.Body>
        </Table>
        <Button icon label={"add user"} onClick={this.onAddUser.bind(this)}>
          <Icon name='plus' />
        </Button>
        <Input focus placeholder='User...' onChange={this.onUserInput.bind(this)}/>
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
    getGroupUsers: (id) => {
      dispatch(getGroupUsers(id));
    },
    AddGroupUsers: (id, userid) => {
      dispatch(AddGroupUsers(id, userid));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
