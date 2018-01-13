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
  } else if (screen === 'ProfileScreenAuthored') {
    Actions.ProfileScreenAuthored(props)
  } else if (screen === 'ProfileScreenLiked') {
    Actions.ProfileScreenLiked(props)
  } else if (screen === 'UserScreenAuthored') {
    Actions.UserScreenAuthored(props)
  } else if (screen === 'UserScreenLiked') {
    Actions.UserScreenLiked(props)
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

export const navigateToProfile = (props) => (dispatch) => {
  Keyboard.dismiss();

  Actions.push('UserScreenTabs', props);
}

export const goBack = (props) => (dispatch) => {
  Keyboard.dismiss();
  Actions.pop();

  if (props) {
    Actions.refresh(props);
  }
}
