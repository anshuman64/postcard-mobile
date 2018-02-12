// Library Imports
import React           from 'react';
import RN              from 'react-native';
import Firebase        from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';

// Local Imports
import { FRIEND_TYPES }        from '../../actions/friendship_actions.js';
import { styles, pulseIcon }   from './loading_screen_styles.js';
import { defaultErrorAlert }   from '../../utilities/error_utility.js';
import { UTILITY_STYLES }      from '../../utilities/style_utility.js';
import { getPostPlaceholders } from '../../utilities/file_utility.js';

//--------------------------------------------------------------------//

class LoadingScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      iterationCount: 8,
      isLoggedIn:     false,
      isSuccessful:   true,
      isBanned:       false
    }
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Automatically detects login cookie from Firebase and logs in user
  componentDidMount() {
    getPostPlaceholders();

    this.unsubscribe = Firebase.auth().onAuthStateChanged((firebaseUserObj) => {
      if (firebaseUserObj) {
        this.props.loginClient(firebaseUserObj)
          .then(() => {
            if (this.props.client.is_banned) {
              RN.Alert.alert('', 'This account has been disabled. Email support@insiya.io for more info.', [{text: 'OK', style: 'cancel'}]);
              this.setState({ iterationCount: 2, isBanned: true });
            } else {
              this._loadData()
                .then(() => {
                  this.setState({ iterationCount: 2, isLoggedIn: true });
                })
                .catch((error) => {
                  defaultErrorAlert(error);
                });
            }
          })
          .catch((error) => {
            this.setState({ iterationCount: 2, isSuccessful: false });
            defaultErrorAlert(error);
          });
      } else {
        // console.error('No Firebase cookie found'); // Debug Test
        this.setState({ iterationCount: 2, isLoggedIn: false });
      }
    });
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

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onAnimationEnd = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (this.state.isBanned || !this.state.isSuccessful) {
      return;
    }

    if (this.state.isLoggedIn) {
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
        iterationCount={this.state.iterationCount}
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
