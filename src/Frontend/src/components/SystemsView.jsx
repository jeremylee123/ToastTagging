import React from 'react';

export default class SystemsView extends React.Component {
  componentDidMount() {
    fetch('toasttagging.com/getsystems')
      .then(res => {
        this.setState(systems: res);
      });
  }
	render() {
		return (
			<SystemList systems={this.state.systems}
		)
	}
}
