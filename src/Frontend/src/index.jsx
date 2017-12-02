import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Routes from './routes'

ReactDOM.render(
	<AppContainer>
			<Routes />
	</AppContainer>,
	document.getElementById('app')
);

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./app', () => {
		const NextApp = require('./app').default;
		ReactDOM.render(
			<AppContainer>
				<NextApp/>
			</AppContainer>,
			document.getElementById('app')
		);
	});
}
