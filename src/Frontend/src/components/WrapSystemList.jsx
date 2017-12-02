import React from 'react';
import SystemList from './SystemList';

const systems = [{
	    		"id": "1",
	    		"systemName": "System 1",
	    		"companyName": "Company A"
	    	},{
	    		"id": "2",
	    		"systemName": "System 2",
	    		"companyName": "Company A"
	    	},{
	    		"id": "3",
	    		"systemName": "System 3",
	    		"companyName": "Company B"
	    	},{
	    		"id": "4",
	    		"systemName": "System 4",
	    		"companyName": "Company C"
	    	},{
	    		"id": "5",
	    		"systemName": "System 5",
	    		"companyName": "Company D"
	    	}];
        
export default class WrapSystemList extends React.Component {
	render() {
		return (
			<div>
				<SystemList systems={systems} />
			</div>
		)
	}
}
