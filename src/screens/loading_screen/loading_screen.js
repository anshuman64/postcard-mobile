// Library Imports
import React           from 'react';
import RN              from 'react-native';
import Firebase        from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import OneSignal       from 'react-native-onesignal';

// Local Imports
import { POST_TYPES }                               from '../../actions/post_actions';
import { FRIEND_TYPES }                             from '../../actions/friendship_actions';
import { styles, pulseIcon }                        from './loading_screen_styles';
import { defaultErrorAlert }                        from '../../utilities/error_utility';
import { UTILITY_STYLES }                           from '../../utilities/style_utility';
import { getPostPlaceholders, getCameraRollPhotos } from '../../utilities/file_utility';

//--------------------------------------------------------------------//

class LoadingScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.isAnimationEnd  = false;
    this.currentAppState = 'active';
    this.lastUpdate      = new Date();
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
    getCameraRollPhotos();

    this.unsubscribe = Firebase.auth().onAuthStateChanged((firebaseUserObj) => {
      if (firebaseUserObj) {
        this.props.loginClient(firebaseUserObj)
          .then(() => {
            if (this.props.client.is_banned) {
              RN.Alert.alert('', 'This account has been disabled. Email support@insiya.io for more info.', [{text: 'OK', style: 'cancel'}]);
            } else {
              this._onLogin();
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

  _loadData = () => {
    for (let postType in POST_TYPES) {
      this.props.getPosts(this.props.client.authToken, this.props.client.firebaseUserObj, true, this.props.client.id, POST_TYPES[postType], true);
    }

    this.props.getBlockedUsers(this.props.client.authToken, this.props.client.firebaseUserObj);

    for (let friendType in FRIEND_TYPES) {
      this.props.getFriendships(this.props.client.authToken, this.props.client.firebaseUserObj, FRIEND_TYPES[friendType]);
    }
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // When refocusing app, refresh friendships
  _handleAppStateChange = (nextAppState) => {
    if (this.currentAppState.match(/inactive|background/) && nextAppState === 'active') {
      let currentTime = new Date();
      let minsDiff = (currentTime - this.lastUpdate) / (1000 * 60);

      if (minsDiff > 1) {
        this._loadData();
        this.lastUpdate = new Date();
      }
    }

    this.currentAppState = nextAppState;
  }

  _onOpened = (openResult) => {
    let data = openResult.notification.payload.additionalData;

    if (data.type === 'receive-like') {
      this.props.navigateTo('LikedScreen');
    } else if (data.type === 'receive-friendship' || data.type === 'receive-accepted-friendship') {
      this.props.navigateTo('FriendScreen', { tab: true });
    } else if (data.type === 'receive-post') {
      this.props.navigateTo('HomeScreen');
    } else if (data.type === 'receive-message') {
      this.props.navigateTo('MessagesScreen', { userId: data.client.id });
    }
  }

  _onLogin = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    this.isAnimationEnd = true;
    let client = this.props.usersCache[this.props.client.id];
    this._loadData();

    if (client && client.username) {
      this.props.navigateTo('HomeScreen');
    } else {
      this.props.navigateTo('UsernameScreenLogin');
    }
  }

  _onAnimationEnd = () => {
    if (this.isAnimationEnd) {
      return;
    }

    this.isAnimationEnd = true;
    this.props.navigateTo('WelcomeScreen');
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
