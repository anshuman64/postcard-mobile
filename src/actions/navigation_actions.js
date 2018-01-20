import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// Navigates to particular screen and sends props. Dismisses keyboard before navigating.
export const navigateTo = (screen, props) => (dispatch) => {
  Keyboard.dismiss();

  if (screen === 'DebugLoginScreen') {
    Actions.DebugLoginScreen(props)
  } else if (screen === 'LoadingScreen') {
    Actions.LoadingScreen(props)
  } else if (screen === 'WelcomeScreen') {
    Actions.WelcomeScreen(props)
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
  } else if (screen === 'ProfileScreen') {
    Actions.ProfileScreen(props)
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

// Adds user ProfilseScreen to top of stack with props.
export const navigateToProfile = (props) => (dispatch) => {
  Keyboard.dismiss();

  Actions.push('UserScreen', props);
}

// Pops top of stack. If props, refreshes screen with props (only way sending props works).
export const goBack = (props) => (dispatch) => {
  Keyboard.dismiss();
  Actions.pop();

  if (props) {
    Actions.refresh(props);
  }
}
