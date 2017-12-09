import React, { Component } from 'react';
import { connect } from 'react-redux';

import SystemsTable from './components/SystemsTable';

import { getSystemsList } from './actions/SystemsActions';

class SystemsListPage extends React.Component {
  componentWillMount() {
    this.props.getSystemsList();
  }
	render() {
    console.log("current this.props.data.systemsList:");
    console.log(this.props.data.systemsList.systemsList);
		return (
			<SystemsTable systems={this.props.data.systemsList.systemsList} isLoading={this.props.data.currentlyLoading}/>
		)
	}
}

function mapStateToProps(state) {
  return {
    data: state.systemsList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSystemsList: () => {
      dispatch(getSystemsList());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemsListPage)
