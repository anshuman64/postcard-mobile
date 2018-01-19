// Library Imports
import React           from 'react';
import RN              from 'react-native';
import Firebase        from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';

// Local Imports
import { styles, pulseIcon } from './loading_screen_styles.js';

//--------------------------------------------------------------------//


class LoadingScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isLoginSuccessful: false,
      iterationCount:    'infinite'
    }
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Automatically detects login cookie from Firebase and logs in user
  componentDidMount() {
    this.unsubscribe = Firebase.auth().onAuthStateChanged((firebaseUserObj) => {
      if (firebaseUserObj) {
        this.props.loginUser(firebaseUserObj)
          .then(() => {
            this.setState({ iterationCount: 2, isLoginSuccessful: true });
          })
          .catch((error) => {
            console.error(error);
            this.setState({ iterationCount: 2, isLoginSuccessful: false });
          })
      } else {
        console.error('No Firebase cookie found');
        this.setState({ iterationCount: 2, isLoginSuccessful: false });
      }
    });
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onAnimationEnd = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (this.state.isLoginSuccessful) {
      if (!this.props.user.username) {
        return this.props.navigateTo('UsernameScreenLogin');
      } else {
        return this.props.navigateTo('HomeScreen');
      }
    } else {
      return this.props.navigateTo('LoginScreen');
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
      <RN.View style={styles.container}>
        {this._renderLoadingIcon()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default LoadingScreen;
