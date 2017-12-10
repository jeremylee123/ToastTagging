import React from 'react';
import { Icon, Label, Menu, Table, Input, Header } from 'semantic-ui-react'

import SystemTag from './SystemTag';

class SystemInfo extends React.Component {
  constructor(props) {
	super(props);
	}
  // paginate(x) {
  // TODO
  // }
  render() {
    const tags = this.props.info.tags;
    const systemName = this.props.info.systemInfo.systemName;
    const companyName = this.props.info.systemInfo.companyName;
    console.log(this.props.info)
    if(tags) {
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
              {tags.map(tag =>
        				<SystemTag key={tag.id} tag={tag} />
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

export default SystemInfo;
