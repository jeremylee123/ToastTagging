import React from 'react';
import request from 'sync-request';

import SystemsTable from './SystemsTable';

class SystemsListPage extends React.Component {
  constructor(props) {
  super(props);
  this.state = {};
  }

  getSystemsList() {
    let response = request('GET', 'http://127.0.0.1:3000/api/listsystems', {
      'token':  localStorage.token
    });
    if (response) {
      return response.body;
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

export default SystemsListPage
