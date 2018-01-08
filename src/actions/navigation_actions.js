import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

export const navigateTo = (screen, props) => (dispatch) => {
  Keyboard.dismiss();

  if (screen === 'DebugLoginScreen') {
    Actions.DebugLoginScreen(props)
  } else if (screen === 'LoadingScreen') {
    Actions.LoadingScreen(props)
  } else if (screen === 'LoginScreen') {
    Actions.LoginScreen(props)
  } else if (screen === 'ConfirmCodeScreen') {
    Actions.ConfirmCodeScreen(props)
  } else if (screen === 'UsernameScreenLogin') {
    Actions.UsernameScreenLogin(props)
  } else if (screen === 'AvatarScreen') {
    Actions.AvatarScreen(props)
  } else if (screen === 'HomeScreen') {
    Actions.HomeScreen(props)
  } else if (screen === 'AuthoredPostsTab') {
    Actions.AuthoredPostsTab(props)
  } else if (screen === 'LikedPostsTab') {
    Actions.LikedPostsTab(props)
  } else if (screen === 'NewPostScreen') {
    Actions.NewPostScreen(props)
  } else if (screen === 'MenuScreen') {
    Actions.MenuScreen(props)
  } else if (screen === 'UsernameScreen') {
    Actions.UsernameScreen(props)
  } else if (screen === 'CameraRollScreen') {
    Actions.CameraRollScreen(props)
  }
}

export const goBack = (props) => (dispatch) => {
  Keyboard.dismiss();
  Actions.pop();

  if (props) {
    Actions.refresh(props);
  }
}
