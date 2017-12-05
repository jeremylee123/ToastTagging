import React from 'react';
import request from 'sync-request';

import SystemsTable from './SystemsTable';

export default class SystemsView extends React.Component {
  constructor(props) {
  super(props);
  this.state = {};
  }

  getSystemsList() {
    let response = request('GET', 'http://127.0.0.1:3000/api/listsystems');
    if (response) {
      return JSON.parse(response.body);
    } else {
      console.log("Failed to request system list");
    }

  }

  componentWillMount() {
    this.setState({systems: this.getSystemsList()});
  }
	render() {
		return (
			<SystemsTable systems={this.state.systems}/>
		)
	}
}
