import React, { Component} from 'react';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import LoadingIndicator from './components/LoadingIndicator';

class LoginPage extends Component {
	render() {
		const { formState, currentlySending } = this.props.data;		
    return (
			<div className="form-page__wrapper">
				<div className="form-page__form-wrapper">
					<div className="form-page__form-header">
						<h2 className="form-page__form-heading">Login</h2>
					</div>
					{/* While the form is sending, show the loading indicator,
						otherwise show "Log in" on the submit button */}
		    	<LoginForm data={formState} btnText={"Login"} currentlySending={currentlySending}/>
				</div>
			</div>
		);
  }

}

//Choose which state from global state tree goes to props
function mapStateToProps(state) {
  return {
    data: state.login
  };
}

// Wrap the component to inject state into it
export default connect(mapStateToProps)(LoginPage);
