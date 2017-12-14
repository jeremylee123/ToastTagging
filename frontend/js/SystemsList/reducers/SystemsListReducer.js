import { SET_SYSTEMS_LIST } from '../constants/SystemsListConstants';

const assign = Object.assign || require('object.assign');

const initialState = {
  systemsList: [{companyName: 'dillon', serialNumber: '1', systemName: 'systemName', productFamily: 'productFamily', model: 'model', osVersion: 'osVersion'}],
  currentlyLoading: true,
  errorMessage: '',
  page: 1
};

export default function SystemsListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SYSTEMS_LIST:
      console.log(action);
      let res1 = assign({}, state, {
            systemsList: action.newData.list,
            page: action.newData.page
        });
        console.log("state");
        console.log(res1);
        return res1;
      break;
    default:
      return state;
  }
}
