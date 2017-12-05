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
	module.hot.accept('./components/SystemsView', () => {
		const NextApp = require('./components/SystemsView').default;
		ReactDOM.render(
			<AppContainer>
				<NextApp/>
			</AppContainer>,
			document.getElementById('app')
		);
	});
}
