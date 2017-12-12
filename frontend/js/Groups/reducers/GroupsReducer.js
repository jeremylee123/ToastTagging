import { SET_GROUPS_LIST, SET_GROUPINFO, SET_GROUP_USER_INFO } from '../constants/GroupsConstants';

const assign = Object.assign || require('object.assign');

const initialState = {
  groups: [{name: 'testName', manager: 'manager1'}],
  currentlyLoading: true,
  errorMessage: '',
  groupInfo: [],
  groupUserInfo: [{username:"miles"}]
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
    case SET_GROUPINFO:
        let res= assign({}, state, {
          groups: {
              ...state.groups,
              groupInfo: action.groupInfo
          }

        });
        console.log("new state from set-systems");
        console.log(res);
        return res;
        break;
    case SET_GROUP_USER_INFO:
          const res2 = assign({}, state, {
            groups: {
                ...state.groups,
                groupUserInfo: action.groupUserInfo
            }
          });
          console.log("new state from set-users:")
          console.log(res2);
          return res2;
          break;
    default:
      return state;
  }
}
