import { SET_GROUPS_LIST_I_MANAGE, SET_GROUPS_LIST_I_AM_IN, SET_GROUPINFO, SET_GROUP_USER_INFO } from '../constants/GroupsConstants';

const assign = Object.assign || require('object.assign');

const initialState = {
  groupsIManage: ["peanut"],
  groupsIAMIN: [],
  currentlyLoading: true,
  errorMessage: '',
  groupInfo: [],
  groupUserInfo: [{username:"miles"}]
};

export default function GroupsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GROUPS_LIST_I_MANAGE:
      return assign({}, state, {
          groupsIManage: action.groups
      });
      break;
      case SET_GROUPS_LIST_I_AM_IN:
        return  assign({}, state, {

              groupsIAMIN: action.groups
        });

        break;
    case SET_GROUPINFO:
        let res= assign({}, state, {
              groupInfo: action.groupInfo
        });
        console.log("groupinfo payload:")
        console.log(action.groupInfo);
        console.log("SET_GROUPINFO reduced:")
        console.log(res);
        return res;
        break;
    case SET_GROUP_USER_INFO:
          const res2 = assign({}, state, {

                groupUserInfo: action.groupUserInfo

          });
          return res2;
          break;
    default:
      return state;
  }
}
