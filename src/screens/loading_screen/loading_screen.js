// Library Imports
import React           from 'react';
import RN              from 'react-native';
import Firebase        from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import OneSignal       from 'react-native-onesignal';

// Local Imports
import { FRIEND_TYPES }        from '../../actions/friendship_actions';
import { styles, pulseIcon }   from './loading_screen_styles';
import { defaultErrorAlert }   from '../../utilities/error_utility';
import { UTILITY_STYLES }      from '../../utilities/style_utility';
import { getPostPlaceholders } from '../../utilities/file_utility';

//--------------------------------------------------------------------//

class LoadingScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.isLoggedIn      = false;
    this.isOver          = false;
    this.currentAppState = 'active';
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentWillMount() {
    OneSignal.addEventListener('opened', this._onOpened);
  }

  // Automatically detects login cookie from Firebase and logs in user
  componentDidMount() {
    RN.AppState.addEventListener('change', this._handleAppStateChange);
    getPostPlaceholders();

    this.unsubscribe = Firebase.auth().onAuthStateChanged((firebaseUserObj) => {
      if (firebaseUserObj) {
        this.props.loginClient(firebaseUserObj)
          .then(() => {
            if (this.props.client.is_banned) {
              RN.Alert.alert('', 'This account has been disabled. Email support@insiya.io for more info.', [{text: 'OK', style: 'cancel'}]);
            } else {
              this._loadData()
                .then(() => {
                  this.isLoggedIn = true;
                  this._onAnimationEnd();
                })
                .catch((error) => {
                  defaultErrorAlert(error);
                });
            }
          })
          .catch((error) => {
            defaultErrorAlert(error);
          });
      } else {
        // console.error('No Firebase cookie found'); // Debug Test
        this._onAnimationEnd();
      }
    });
  }

  componentWillUnmount() {
    RN.AppState.removeEventListener('change', this._handleAppStateChange);
    OneSignal.removeEventListener('opened', this._onOpened);
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  async _loadData()  {
    for (let friendType in FRIEND_TYPES) {
      await this.props.getFriendships(this.props.client.authToken, this.props.client.firebaseUserObj, FRIEND_TYPES[friendType]);
    }

    await this.props.getBlockedUsers(this.props.client.authToken, this.props.client.firebaseUserObj);
  }

  _onOpened = (openResult) => {
    OneSignal.clearOneSignalNotifications(); // clears all notifications on Android when one is opened

    let data = openResult.notification.payload.additionalData;

    if (data.type === 'receive-like') {
      this.props.navigateTo('ProfileScreen');
    } else if (data.type === 'receive-friendship' || data.type === 'receive-accepted-friendship') {
      this.props.navigateTo('FriendScreen');
    } else if (data.type === 'receive-post') {
      this.props.navigateTo('HomeScreen');
    } else if (data.type === 'receive-message') {
      this.props.navigateToMessages({ userId: data.client.id });
    }
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // When refocusing app, refresh friendships
  _handleAppStateChange = (nextAppState) => {
    if (this.currentAppState.match(/inactive|background/) && nextAppState === 'active') {
      this._loadData()
        .catch((error) => {
          defaultErrorAlert(error);
        });
    }

    this.currentAppState = nextAppState;
  }

  _onAnimationEnd = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (this.isOver) {
      return;
    }

    this.isOver = true;

    if (this.isLoggedIn) {
      let client = this.props.usersCache[this.props.client.id];

      if (client && client.username) {
        return this.props.navigateTo('HomeScreen');
      } else {
        return this.props.navigateTo('UsernameScreenLogin');
      }
    } else {
      return this.props.navigateTo('WelcomeScreen');
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderLoadingIcon() {
    return (
      <Animatable.Image
        ref={'loadingIcon'}
        style={styles.icon}
        source={require('../../assets/images/icon/icon.png')}
        resizeMode={'cover'}
        animation={pulseIcon}
        direction={'alternate'}
        easing={'ease-in'}
        duration={1500}
        iterationCount={8}
        onAnimationEnd={this._onAnimationEnd}
        />
    )
  }

  render() {
    return (
      <RN.View style={[UTILITY_STYLES.containerCenter, {backgroundColor: 'white'}]}>
        {this._renderLoadingIcon()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default LoadingScreen;
