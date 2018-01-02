import { Actions } from 'react-native-router-flux';

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const navigateTo = (screen) => (dispatch) => {
  Actions[screen].call();
}

export const goBack = () => (dispatch) => {
  Actions.pop();
}
