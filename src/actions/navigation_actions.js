import { Actions } from 'react-native-router-flux';

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const navigateTo = (screen, props) => (dispatch) => {
  Actions[screen].call();

  if (props) {
    Actions.refresh(props);
  }
}

export const goBack = () => (dispatch) => {
  Actions.pop();
}

export const goBackTo = (screen, props) => (dispatch) => {
  Actions.popTo(screen);
  Actions.refresh(props);
}
