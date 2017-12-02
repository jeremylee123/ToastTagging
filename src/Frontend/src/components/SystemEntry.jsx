import React from 'react';

export default class SystemEntry extends React.Component {
	render() {
		return (
			<div className="SystemEntry">
        {this.props.info.companyName} | {this.props.info.systemName}
			</div>
		)
	}
}
