import { Actions } from 'react-native-router-flux';

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

export const NAVIGATION_ACTION_TYPES = {
  RECEIVE_SCREEN: 'RECEIVE_SCREEN'
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const receiveScreen = (data) => {
  return { type: NAVIGATION_ACTION_TYPES.RECEIVE_SCREEN, data: data };
};

export const navigateTo = (screen) => (dispatch) => {
  Actions[screen].call();
  return dispatch(receiveScreen());
}

export const goBack = () => (dispatch) => {
  Actions.pop();
  return dispatch(receiveScreen());
}
