// Library Imports
import React           from 'react';
import RN              from 'react-native';
import Firebase        from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import OneSignal       from 'react-native-onesignal';

// Local Imports
import { POST_TYPES }        from '../../actions/post_actions';
import { FRIEND_TYPES }      from '../../actions/friendship_actions';
import { styles, pulseIcon } from './loading_screen_styles';
import { defaultErrorAlert } from '../../utilities/error_utility';
import { UTILITY_STYLES }    from '../../utilities/style_utility';
import * as FileUtility      from '../../utilities/file_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class LoadingScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.isAnimationEnd          = false;
    this.isLoggedIn              = false;
    this.navigateToNotification  = null;
    this.navigateToMessages      = null;
    this.currentAppState         = 'active';
    this.lastUpdate              = new Date();
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentWillMount() {
    RN.AppState.addEventListener('change', this._handleAppStateChange);
    OneSignal.addEventListener('opened', this._onOpened);
  }

  // Automatically detects login cookie from Firebase and logs in user
  componentDidMount() {
    FileUtility.getPostPlaceholders();
    FileUtility.getCameraRollPhotos();

    this.unsubscribe = Firebase.auth().onAuthStateChanged((firebaseUserObj) => {
      if (firebaseUserObj) {
        // console.log('Firebase cookie found'); // Debug Test
        this.props.loginClient(firebaseUserObj)
          .then(() => {
            // console.log('Logged in'); // Debug Test
            if (this.props.client.is_banned) {
              RN.Alert.alert('', 'This account has been disabled. Email support@insiya.io for more info.', [{text: 'OK', style: 'cancel'}]);
            } else {
              this._loadContacts();
              this._loadData()
                .then(() => {
                  // console.log('Data loaded'); // Debug Test
                  this._onLogin();
                })
                .catch((error) => {
                  defaultErrorAlert(error);
                });
            }
          })
          .catch((error) => {
            if (error.message === 'Log-in in progress') {
              return;
            } else {
              defaultErrorAlert(error);
            }
          });
      } else {
        // console.log('No Firebase cookie found'); // Debug Test
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

  async _loadData() {
    await this._refreshData();
    await this.props.getCircles(this.props.client.authToken, this.props.client.firebaseUserObj);
    await this.props.getBlockedUsers(this.props.client.authToken, this.props.client.firebaseUserObj);
  }

  async _refreshData() {
    await this.props.getConversations(this.props.client.authToken, this.props.client.firebaseUserObj);

    for (let postType in POST_TYPES) {
      await this.props.getPosts(this.props.client.authToken, this.props.client.firebaseUserObj, true, this.props.client.id, POST_TYPES[postType], true);
    }

    for (let friendType in FRIEND_TYPES) {
      if (FRIEND_TYPES[friendType] != FRIEND_TYPES.CONTACTS) {
        await this.props.getFriendships(this.props.client.authToken, this.props.client.firebaseUserObj, FRIEND_TYPES[friendType]);
      }
    }
  }

  _loadContacts = () => {
    this.props.getContacts(this.props.usersCache[this.props.client.id].phone_number)
      .then(() => {
        let contactPhoneNumbers = Object.keys(this.props.contactsCache);

        this.props.getFriendsFromContacts(this.props.client.authToken, this.props.client.firebaseUserObj, contactPhoneNumbers)
          .catch((error) => {
            console.error(error); // Debug Test
          });
        this.props.getContactsWithAccounts(this.props.client.authToken, this.props.client.firebaseUserObj, contactPhoneNumbers)
          .catch((error) => {
            console.error(error); // Debug Test
          });
        this.props.getOtherContacts(this.props.client.authToken, this.props.client.firebaseUserObj, contactPhoneNumbers)
          .catch((error) => {
            console.error(error); // Debug Test
          });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  _navigateFromLoading = () => {
    // Make sure you are logged in
    if (this.isLoggedIn) {
      let client = this.props.usersCache[this.props.client.id];

      // If opening app via notification, go to the screen you intended to go to
      if (this.navigateToNotification) {
        if (this.navigateToNotification === 'MessagesScreen') {
          this.props.navigateTo('MessagesScreen', { convoId: this.navigateToMessages });
        } else {
          this.props.navigateTo(this.navigateToNotification);
        }

        this.navigateToNotification = null;
        this.navigateToMessages     = null;
      // If opening the app normally, go to HomeScreen. TODO: should this be FriendScreen instead?
      } else if (client && client.username) {
        this.props.navigateTo('HomeScreen'); // Debug Test: should be HomeScreen
      // If opening the app normally and haven't created username, go to create username
      } else {
        this.props.navigateTo('UsernameScreenLogin', { screen: 'UsernameScreenLogin' });
      }
    // If haven't logged in and somehow on LoadingScreen, go to WelcomeScreen
  } else if (!this.navigateToNotification) {
      this.props.navigateTo('WelcomeScreen');
    }
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // When refocusing app and logged in, reload data after 1 min
  _handleAppStateChange = (nextAppState) => {
    if (this.currentAppState.match(/inactive|background/) && nextAppState === 'active' && this.isLoggedIn) {
      // If you pressed back and are refocusing, end up on HomeScreen
      if (this.props.currentScreen === 'LoadingScreen' || this.navigateToNotification) {
        this._navigateFromLoading();
      }

      let currentTime = new Date();
      let minsDiff = (currentTime - this.lastUpdate) / (1000 * 60);

      if (minsDiff > 1) {
        this._refreshData();
        FileUtility.getCameraRollPhotos();
        this.lastUpdate = new Date();
      }
    }

    this.currentAppState = nextAppState;
  }

  _onOpened = (openResult) => {
    let data = openResult.notification.payload.additionalData;

    switch (data.type) {
      case 'receive-like':
      case 'receive-follow':
        this.navigateToNotification = 'AuthoredScreen';
        break;
      case 'receive-friendship':
        this.navigateToNotification = 'PendingScreen';
        break;
      case 'receive-accepted-friendship':
      case 'receive-group':
        this.navigateToNotification = 'FriendScreen';
        break;
      case 'receive-post':
        this.navigateToNotification = 'HomeScreen';
        break;
      case 'receive-message':
        this.navigateToNotification = 'MessagesScreen';
        this.navigateToMessages     = data.client_id ? data.client_id : -1 * data.group_id;
        break;
      default:
        this.navigateToNotification = 'HomeScreen';
    }
  }

  _onLogin = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    this.isAnimationEnd = true;
    this.isLoggedIn     = true;

    this._navigateFromLoading();
  }

  _onAnimationEnd = () => {
    if (this.isAnimationEnd) {
      return;
    }

    this.isAnimationEnd = true;
    this._navigateFromLoading();
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
        iterationCount={20}
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
