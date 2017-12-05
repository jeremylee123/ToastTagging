import React from 'react';
import SystemEntry from './SystemEntry';

export default class SystemList extends React.Component {
	constructor(props) {
	super(props);
	this.state = {};
	}
	render() {
	let systems = this.props.systems;
		return (
			<div>
				<ul>
			{systems.map(system =>
				<SystemEntry
					system={system}
				/>
			)}
			</ul>
			</div>
		)
	}
}
