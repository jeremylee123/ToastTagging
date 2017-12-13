import React from 'react';
import { Icon, Label, Menu, Table, Input, Header } from 'semantic-ui-react'

import SystemTag from './SystemTag';

class SystemInfo extends React.Component {
  constructor(props) {
    super(props);
	}
  untagSystem(tagID, serialNumber) {
    console.log("REMOVE TAG "+ tagID +" FROM SYSTEM "+ serialNumber);
    fetch('http://127.0.0.1:3000/api/tags?serial_id='+ serialNumber +'&userid='+ tagID, {
      method: "DELETE",
      headers: {
        "token": localStorage.token
      }
    })
    .then((resp) => {
      window.location.reload();
    })
    .catch((error) => {
      console.log("There was an internal error removing tag "+ tagID +" for system "+ serialNumber);
      console.log(error);
      console.log("done printing error")
    });
  }
  render() {
    // console.log(this.props)
    const tags = this.props.info.tags;
    const systemName = this.props.info.systemInfo.systemName;
    const companyName = this.props.info.systemInfo.companyName;
    const serialNumber = this.props.info.systemInfo.serialNumber;
    return (
      <div>
        <Header as="h1">System: {systemName}</Header>
        <Header sub>Company: {companyName}</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>{"Remove"}</Table.HeaderCell>
              <Table.HeaderCell>{"Tag Name"}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tags.map(tag => {
              const untag = this.untagSystem.bind(this, tag.id, serialNumber);
      				return (<SystemTag untag={untag} key={tag.id} tag={tag} />);
      			})}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default SystemInfo;
