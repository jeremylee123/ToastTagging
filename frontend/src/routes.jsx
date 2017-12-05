import React from 'react';
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';
import SystemsView from './components/SystemsView';
import 'styles/index.scss';

export default class Routes extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={SystemsView}/>
				</div>
			</Router>
		)
	}
}
