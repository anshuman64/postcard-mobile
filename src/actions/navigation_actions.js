import { Keyboard } from 'react-native';
import { Actions }  from 'react-native-router-flux';

//--------------------------------------------------------------------//

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
    } else if (screen === 'DisplayNameScreen') {
      Actions.DisplayNameScreen(props)
    } else if (screen === 'DisplayNameScreenLogin') {
      Actions.DisplayNameScreenLogin(props)
    } else if (screen === 'AvatarScreen') {
      Actions.AvatarScreen(props)
    } else if (screen === 'HomeScreen') {
      Actions.HomeScreen(props)
    } else if (screen === 'FriendScreen') {
      Actions.FriendScreen(props)
    } else if (screen === 'PendingScreen') {
      Actions.PendingScreen(props)
    } else if (screen === 'AuthoredScreen') {
      Actions.AuthoredScreen(props)
    } else if (screen === 'LikedScreen') {
      Actions.LikedScreen(props)
    } else if (screen === 'UserScreen') {
      Actions.UserScreen(props)
    } else if (screen === 'NewPostScreen') {
      Actions.NewPostScreen(props)
    } else if (screen === 'ShareScreen') {
      Actions.ShareScreen(props)
    } else if (screen === 'CreateGroupScreen') {
      Actions.CreateGroupScreen(props)
    } else if (screen === 'AddGroupMembersScreen') {
      Actions.AddGroupMembersScreen(props)
    } else if (screen === 'CreateCircleScreen') {
      Actions.CreateCircleScreen(props)
    } else if (screen === 'MessagesScreen') {
      Actions.MessagesScreen(props)
    } else if (screen === 'AddFriendScreen') {
      Actions.AddFriendScreen(props)
    } else if (screen === 'NameCircleScreen') {
      Actions.NameCircleScreen(props)
    } else if (screen === 'NameGroupScreen') {
      Actions.NameGroupScreen(props)
    } else if (screen === 'MenuScreen') {
      Actions.MenuScreen(props)
    } else if (screen === 'UserMenuScreen') {
      Actions.UserMenuScreen(props)
    } else if (screen === 'GroupMenuScreen') {
      Actions.GroupMenuScreen(props)
    } else if (screen === 'UsernameScreen') {
      Actions.UsernameScreen(props)
    } else {
      return;
    }
  }

  let checkRefresh = () => {
    if (screen === Actions.currentScene.replace(/^_/, '')) {
      Actions.refresh(props);
    } else {
      navigateScreens();
    }
  }

  if (Actions.currentScene === 'LoginScreen'
      || Actions.currentScene === 'MessagesScreen'
      || Actions.currentScene === 'ConfirmCodeScreen'
      || Actions.currentScene === 'UsernameScreenLogin'
      || Actions.currentScene === 'UsernameScreen'
      || Actions.currentScene === 'DisplayNameScreen'
      || Actions.currentScene === 'DisplayNameScreenLogin'
      || Actions.currentScene === 'AddFriendScreen'
      || Actions.currentScene === 'NameCircleScreen'
      || Actions.currentScene === 'NameGroupScreen'
      || Actions.currentScene === 'NewPostScreen'
      || Actions.currentScene === 'DebugLoginScreen') {
    dismissKeyBoard()
      .then(() => {
        checkRefresh();
      })
  } else {
    checkRefresh();
  }
}

// Adds UserScreen to top of stack with props.
export const navigateToProfile = (props) => (dispatch) => {
  dismissKeyBoard();

  Actions.push('UserScreen', props);
}

// Pops top of stack. If props, refreshes screen with props (only way sending props works).
export const goBack = (props) => (dispatch) => {
  dismissKeyBoard();
  Actions.pop();

  if (props) {
    Actions.refresh(props);
  }
}
