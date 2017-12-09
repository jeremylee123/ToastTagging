import { SET_GROUPS_LIST } from '../constants/GroupsConstants';

const assign = Object.assign || require('object.assign');

const initialState = {
  groups: [{name: 'testName', manager: 'manager1'}],
  currentlyLoading: true,
  errorMessage: ''
};

export default function GroupsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GROUPS_LIST:
      return assign({}, state, {
        groups: {
            groups: action.groups
        }
      });
      break;
    default:
      return state;
  }
}
