import { Keyboard } from 'react-native';
import { Actions }  from 'react-native-router-flux';

//--------------------------------------------------------------------//
// Helper Functions
//--------------------------------------------------------------------//

// Ensures keyboard is dismissed before navigating to next screen
let dismissKeyBoard = () => {
  return new Promise((resolve, reject) => {
    Keyboard.dismiss();
    setTimeout(() => resolve(), 1);
  });
};

//--------------------------------------------------------------------//
// Action Creators
//--------------------------------------------------------------------//

// Navigates to particular screen and sends props. Dismisses keyboard before navigating.
export const navigateTo = (screen, props) => (dispatch) => {
  let navigateScreens = () => {
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
    } else if (screen === 'DiscoverScreen') {
      Actions.DiscoverScreen(props)
    } else if (screen === 'FriendRequestScreen') {
      Actions.FriendRequestScreen(props)
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
    } else {
      return;
    }
  }

  if (Actions.currentScene === 'LoginScreen'
      || Actions.currentScene === 'ConfirmCodeScreen'
      || Actions.currentScene === 'UsernameScreenLogin'
      || Actions.currentScene === 'UsernameScreen'
      || Actions.currentScene === 'NewPostScreen'
      || Actions.currentScene === 'DebugLoginScreen') {
    dismissKeyBoard()
      .then(() => {
        navigateScreens();
      })
  } else {
    navigateScreens();
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
