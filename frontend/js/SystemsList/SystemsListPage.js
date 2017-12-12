import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';


import SystemsTable from './components/SystemsTable';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';

import { getSystemsList } from './actions/SystemsActions';

class SystemsListPage extends React.Component {
  componentWillMount() {
    this.props.getSystemsList();
  }
	render() {
		return (
      <div>
        <Navbar/>
        <SearchBar/>
  			<SystemsTable systems={this.props.data.systemsList.systemsList} isLoading={this.props.data.currentlyLoading}/>
      </div>
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
