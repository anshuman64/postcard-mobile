import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const navigateTo = (screen, props) => (dispatch) => {
  Keyboard.dismiss();

  // Preferred method is to call Actions.key(props) if passing props
  if (screen === 'ConfirmCodeScreen') {
    Actions.ConfirmCodeScreen(props)
  } else {
    Actions[screen].call();

    if (props) {
      Actions.refresh(props);
    }
  }
}

export const goBack = (props) => (dispatch) => {
  Keyboard.dismiss();
  Actions.pop();

  if (props) {
    Actions.refresh(props);
  }
}
