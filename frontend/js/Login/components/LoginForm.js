import React, { Component } from 'react';
import { changeForm } from '../actions/LoginActions';
import LoadingButton from './LoadingButton';
import ErrorMessage from './ErrorMessage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/LoginActions';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

class LoginForm extends Component {
  render() {
    return(
      <form className="form" onSubmit={this._onSubmit.bind(this)}>
        <ErrorMessage />
        <div className="form__field-wrapper">
          <input className="form__field-input" type="text" id="username" value={this.props.data.username} placeholder="frank.underwood" onChange={this._changeUsername.bind(this)} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
          <label className="form__field-label" htmlFor="username">Username</label>
        </div>
        <div className="form__field-wrapper">
          <input className="form__field-input" id="password" type="password" value={this.props.data.password} placeholder="••••••••••"  onChange={this._changePassword.bind(this)} />
          <label className="form__field-label" htmlFor="password">Password</label>
        </div>
        <div className="form__submit-btn-wrapper">
          {this.props.currentlySending ? (
            <LoadingButton />
          ) : (
            <button className="form__submit-btn" type="submit">{this.props.btnText}</button>
          )}
        </div>
      </form>
    );
  }

  // Change the username in the app state
  _changeUsername(evt) {
    var newState = this._mergeWithCurrentState({
      username: evt.target.value
    });

    this.props.onEmitChange(newState);
  }

  // Change the password in the app state
  _changePassword(evt) {
    var newState = this._mergeWithCurrentState({
      password: evt.target.value
    });
    this.props.onEmitChange(newState);
  }

  // Merges the current state with a change
  _mergeWithCurrentState(change) {
    return assign(this.props.data, change);
  }


  // onSubmit call the passed onSubmit function
  _onSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.props.data.username, this.props.data.password);
  }
}

LoginForm.propTypes = {
  btnText: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    data: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEmitChange: (newState) => {
      dispatch(changeForm(newState));
    },
    onSubmit: (username, password) => {
      dispatch(login(username, password));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
