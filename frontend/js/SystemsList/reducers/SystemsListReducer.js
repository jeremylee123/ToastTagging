import { SET_SYSTEMS_LIST } from '../constants/SystemsListConstants';

const assign = Object.assign || require('object.assign');

const initialState = {
  systemsList: [{companyName: 'dillon', serialNumber: '1', systemName: 'systemName', productFamily: 'productFamily', model: 'model', osVersion: 'osVersion'}],
  currentlyLoading: true,
  errorMessage: ''
};

export default function SystemsListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SYSTEMS_LIST:
      return assign({}, state, {
        systemsList: {
            systemsList: action.systemsList
        }
      });
      break;
    default:
      return state;
  }
}
