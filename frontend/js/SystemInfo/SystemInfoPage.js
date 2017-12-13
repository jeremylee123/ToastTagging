import React, { Component } from 'react';
import { connect } from 'react-redux';

import SystemInfo from './components/SystemInfo';
import SystemTag from './components/SystemTag';
import SystemTagCreate from './components/SystemTagCreate';

import { getSystemInfo } from './actions/SystemInfoActions';
import { getTagsList } from './actions/SystemInfoActions';

class SystemInfoPage extends React.Component {
  componentWillMount() {
    this.props.getSystemInfo(this.props.params.serialNumber);
    this.props.getTagsList(this.props.params.serialNumber);
  }
	render() {
		return (
			<SystemInfo info={this.props.data}/>
		)
	}
}

function mapStateToProps(state) {
  return {
    data: state.SystemInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSystemInfo: (serialNumber) => {
      dispatch(getSystemInfo(serialNumber));
    },
    getTagsList: (serialNumber) => {
      dispatch(getTagsList(serialNumber));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemInfoPage)