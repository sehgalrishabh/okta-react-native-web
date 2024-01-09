import type { AuthStates, PayloadAction } from '../types';

export const OktaState = {
  isAuthenticated: false,
  accessToken: undefined,
  idToken: undefined,
  refreshToken: undefined,
  user: undefined,
};

export const ActionTypes = {
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  UPDATE_USER: 'UPDATE_USER',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
};

const OktaReducer = (state: AuthStates, action: PayloadAction) => {
  switch (action.type) {
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        isAuthenticated: action.isAuthenticated,
        idToken: action.idToken,
        refreshToken: action.refreshToken,
        user: action.user,
      } as AuthStates;
    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.user,
      } as AuthStates;
    case ActionTypes.AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        accessToken: undefined,
        idToken: undefined,
        user: undefined,
      } as AuthStates;
    default:
      return state;
  }
};

export default OktaReducer;
