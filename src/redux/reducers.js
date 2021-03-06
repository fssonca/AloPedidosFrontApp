import {combineReducers} from 'redux';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'TELEPHONE_VERIFIED':
      return Object.assign({}, state, {telephoneVerified: action.payload});

    case 'CLIENT_REGISTERED':
      return Object.assign({}, state, {cliente: action.payload});

    case 'LOCAL_PADRAO':
      return Object.assign({}, state, {localPadrao: action.payload});

    default:
      return state;
  }
};

export default combineReducers({
  state: reducer,
});
