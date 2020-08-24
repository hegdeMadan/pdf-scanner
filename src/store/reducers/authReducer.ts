import { authAction } from '../constants';
import { authState } from './initialState/authState';

const {
  USER_SIGNED_IN,
  USER_SIGNED_OUT,
  USER_SIGN_IN_PROGRESS,
  SIGN_IN_ERROR,
  SIGN_OUT_ERROR,
} = authAction;

export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case USER_SIGNED_IN:
      return {
        ...state,
        userSignedIn: true,
      };

    case USER_SIGNED_OUT:
      return {
        ...state,
        userSignedIn: false,
      };

    case USER_SIGN_IN_PROGRESS:
      return {
        ...state,
        userSignedIn: false,
      };

    case SIGN_IN_ERROR:
    case SIGN_OUT_ERROR:
      return {
        ...state,
        userSignedIn: false,
        signInError: action.error,
      };

    default:
      return state;
  }
};
