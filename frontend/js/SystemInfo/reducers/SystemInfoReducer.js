import { SET_SYSTEM_INFO,SET_TAGS_LIST } from '../constants/SystemInfoConstants';

const assign = Object.assign || require('object.assign');

const initialState = {
  tags: [],
  systemInfo: {companyName: 'dillon', serialNumber: '1', systemName: 'systemName', productFamily: 'productFamily', model: 'model', osVersion: 'osVersion'}
};

export default function SystemInfoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SYSTEM_INFO:
      return assign({}, state, {
        systemInfo: action.systemInfo
      });
      break;
    case SET_TAGS_LIST:
      return assign({}, state, {
        tags: action.tags
      });
      break;
    default:
      return state;
  }
}
