// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Firebase        from 'react-native-firebase';

// Local Imports
import { styles }                          from './loading_screen_styles.js';
import * as Animations                     from './loading_screen_animations.js';
import { toHomeScreen, toLoginScreen }     from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//


class LoadingScreen extends React.PureComponent {

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

  componentDidMount() {
    let successCallback = () => {
      console.log('successCallback')
      this.setState({ iterationCount: 2, isLoginSuccessful: true });
    };

    let errorCallback = () => {
      console.log('errorCallback')
      this.setState({ iterationCount: 2, isLoginSuccessful: false });
    };

    this.unsubscribe = Firebase.auth().onAuthStateChanged((firebaseUserObj) => {
      if (firebaseUserObj) {
        this.props.loginUser(firebaseUserObj)
          .then(() => {
            successCallback();
          })
          .catch(() => {
            errorCallback();
          })
      } else {
        errorCallback();
      }
    })
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _onAnimationEnd = () => {
    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (this.state.isLoginSuccessful) {
      return this.props.navigateTo('HomeScreen');
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
        resizeMode={'contain'}
        animation={Animations.pulseIcon}
        direction={'alternate'}
        easing={'ease-in'}
        duration={20}
        iterationCount={this.state.iterationCount}
        onAnimationEnd={this._onAnimationEnd}
        />
    )
  }

  render() {
    return (
      <RN.View style={styles.container}>
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default LoadingScreen;
