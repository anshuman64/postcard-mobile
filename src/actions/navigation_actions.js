import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const navigateTo = (screen, props) => (dispatch) => {
  Keyboard.dismiss();
  Actions[screen].call();

  if (props) {
    Actions.refresh(props);
  }
}

export const goBack = (props) => (dispatch) => {
  Keyboard.dismiss();
  Actions.pop();

  if (props) {
    Actions.refresh(props);
  }
}
