import React from 'react';
import { Icon, Label, Menu, Table, Input } from 'semantic-ui-react'

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
    console.log(this.props.info)
    if(tags) {
      return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>{"Remove"}</Table.HeaderCell>
              <Table.HeaderCell>{"Tag ID"}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tags.map(tag_id =>
      				<SystemTag tagID={tag_id} />
      			)}
          </Table.Body>
        </Table>
      )
    } else {
      return (<div></div>)
    }

  }
}

export default SystemInfo;
