import React from 'react';
import SystemEntry from './SystemEntry';

export default class SystemList extends React.Component {
	render() {
		return (
			<div>
        <ul>
        {this.props.systems.map(system =>
          <SystemEntry
            id = {system.id}
            info = {system}
          />
        )}
        </ul>
			</div>
		)
	}
}

/*
const SystemList = (systems) => (

)
*/

/*
SystemList.propTypes = {
  systems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.
  }))
}
*/
