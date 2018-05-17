// Library Imports
import React           from 'react';
import RN              from 'react-native';
import Firebase        from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import OneSignal       from 'react-native-onesignal';
import Permissions     from 'react-native-permissions';

// Local Imports
import { amplitude }           from '../../utilities/analytics_utility';
import { POST_TYPES }          from '../../actions/post_actions';
import { FRIEND_TYPES }        from '../../actions/friendship_actions';
import { styles, pulseIcon }   from './loading_screen_styles';
import { defaultErrorAlert }   from '../../utilities/error_utility';
import { UTILITY_STYLES }      from '../../utilities/style_utility';

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
    this.unsubscribe = Firebase.auth().onAuthStateChanged((firebaseUserObj) => {
      if (firebaseUserObj) {
        this.props.loginClient(firebaseUserObj)
          .then(() => {
            if (this.props.usersCache[this.props.client.id].is_banned) {
              RN.Alert.alert('', 'This account has been disabled. Email support@insiya.io for more info.', [{text: 'OK', style: 'cancel'}]);
            } else {
              this._checkPermissions();
            }
          })
          .catch((error) => {
            defaultErrorAlert(error);
          });
      } else {
        this._onNotLoggedIn();
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

  _checkPermissions = () => {
    Permissions.check('contacts')
      .then((response) => {
        if (response === 'authorized') {
          this._loadContacts();

          this._loadData()
            .then(() => {
              this._onLoadData();
            })
            .catch((error) => {
              defaultErrorAlert(error);
            });
        } else {
          RN.Alert.alert('', "Postcard is only fun when we can find your friends. Go to \"Settings\" > \"Postcard\" and enable \"Contacts.\"", [{text: 'OK', style: 'cancel'}]);
        }
      })
      .catch((error) => {
        error.description = 'Check contacts permissions failed';
        amplitude.logEvent('Permissions - Check Contacts', { error_description: error.description, error_message: error.message });
      });
  }

  // TODO: add try/catch error handling
  async _loadData() {
    await this._refreshData();
    await this.props.getCircles(this.props.client.authToken, this.props.client.firebaseUserObj);
    await this.props.getBlockedUsers(this.props.client.authToken, this.props.client.firebaseUserObj);
  }

  // Function with all the data to refresh when refocusing the app
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
    client = this.props.usersCache[this.props.client.id];

    this.props.getContacts(client.phone_number)
      .then(() => {
        let contactPhoneNumbers = Object.keys(this.props.contactsCache);

        this.props.getFriendsFromContacts(this.props.client.authToken, this.props.client.firebaseUserObj, contactPhoneNumbers, !client.username)
          .catch((error) => {
            // console.error(error); // Debug Test
          });
        this.props.getContactsWithAccounts(this.props.client.authToken, this.props.client.firebaseUserObj, contactPhoneNumbers)
          .catch((error) => {
            // console.error(error); // Debug Test
          });
        this.props.getOtherContacts(this.props.client.authToken, this.props.client.firebaseUserObj, contactPhoneNumbers)
          .catch((error) => {
            // console.error(error); // Debug Test
          });
      })
      .catch((error) => {
        // console.error(error);
      })
  }

  _navigateFromLoading = () => {
    // Make sure you are logged in
    if (this.isLoggedIn) {
      let client = this.props.usersCache[this.props.client.id];

      if (this.navigateToNotification) {
        // If opening app via notification, go to the screen you intended to go to
        if (this.navigateToNotification === 'MessagesScreen') {
          this.props.navigateTo('FriendScreen'); // NOTE: leave this here so that MessageScreen back doesn't go to login screen
          this.props.navigateTo('MessagesScreen', { convoId: this.navigateToMessages });
        } else {
          this.props.navigateTo(this.navigateToNotification);
        }

        this.navigateToNotification = null;
        this.navigateToMessages     = null;
      } else if (client && client.full_name && client.username) {
        // If opening the app normally, go to HomeScreen.
        this.props.navigateTo('HomeScreen'); // Debug Test: should be HomeScreen
      } else if (client && client.full_name && !client.username) {
        // If opening the app normally and haven't created username, go to create username
        this.props.navigateTo('UsernameScreenLogin', { screen: 'UsernameScreenLogin' });
      } else if (client && !client.full_name) {
        // If opening the app normally and haven't created username, go to create username
        this.props.navigateTo('DisplayNameScreenLogin', { screen: 'DisplayNameScreenLogin' });
      } else {
        // If haven't logged in and somehow on LoadingScreen, go to WelcomeScreen
        this.props.navigateTo('WelcomeScreen');
      }
    } else if (!this.navigateToNotification) {
      // If haven't logged in and somehow on LoadingScreen, go to WelcomeScreen
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
        this.lastUpdate = new Date();
      }
    }

    this.currentAppState = nextAppState;
  }

  _onOpened = (openResult) => {
    let data = openResult.notification.payload.additionalData;

    switch (data.type) {
      case 'receive-like':
        amplitude.logEvent('Notifications - Receive Like', { is_opened: true });
        this.navigateToNotification = 'AuthoredScreen';
        break;
      case 'receive-friendship':
        amplitude.logEvent('Notifications - Receive Friendship', { is_opened: true });
        this.navigateToNotification = 'PendingScreen';
        break;
      case 'welcome-contact':
        amplitude.logEvent('Notifications - Welcome Contact', { is_opened: true });
        this.navigateToNotification = 'PendingScreen';
        break;
      case 'receive-accepted-friendship':
        amplitude.logEvent('Notifications - Receive Accepted Friendship', { is_opened: true });
        this.navigateToNotification = 'FriendScreen';
        break;
      case 'receive-group':
        amplitude.logEvent('Notifications - Receive Group', { is_opened: true });
        this.navigateToNotification = 'FriendScreen';
        break;
      case 'receive-post':
        amplitude.logEvent('Notifications - Receive Post', { is_opened: true });
        this.navigateToNotification = 'HomeScreen';
        break;
      case 'receive-message':
        amplitude.logEvent('Notifications - Receive Message', { is_opened: true });
        this.navigateToNotification = 'MessagesScreen';
        this.navigateToMessages     = data.client_id ? data.client_id : -1 * data.group_id;
        break;
      default:
        amplitude.logEvent('Notifications - Unknown', { is_opened: true });
        this.navigateToNotification = 'HomeScreen';
    }
  }

  _onLoadData = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    this.isAnimationEnd = true;
    this.isLoggedIn     = true;

    this._navigateFromLoading();
  }

  _onNotLoggedIn = () => {
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
        onAnimationEnd={this._onNotLoggedIn}
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
