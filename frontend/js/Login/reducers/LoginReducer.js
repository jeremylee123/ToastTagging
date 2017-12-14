import { CHANGE_FORM, SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/LoginConstants';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');
import auth from '../utils/auth';

// The initial application state
const initialState = {
  formState: {
    username: '',
    password: ''
  },
  currentlySending: false,
  loggedIn: auth.loggedIn(),
  errorMessage: ''
};

// Takes care of changing the application state
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
    console.log("Clearing auth with CHANGE_FORM")
      let return1 = assign({}, state, {
        login: {
          formState: action.newState
        }
      });
      console.log("return1");
      console.log(return1);
      return return1;
      break;
    case SET_AUTH:
      return assign({}, state, {
        login: {
          loggedIn: action.newState
        }
      });
      break;
    case SENDING_REQUEST:
      return assign({}, state, {
        login: {
          currentlySending: action.sending
        }
      });
      break;
    case SET_ERROR_MESSAGE:
      return assign({}, state, {
        login: {
          errorMessage: action.message
        }
      });
    default:
      return state;
  }
}
