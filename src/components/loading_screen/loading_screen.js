// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';

// Local Imports
import { styles }                          from './loading_screen_styles.js';
import * as Animations                     from './loading_screen_animations.js';
import { toHomeScreen, toLoginScreen }     from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//


class LoadingScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  }

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
      this.setState({ iterationCount: 2, isLoginSuccessful: true });
    };

    let errorCallback = () => {
      this.setState({ iterationCount: 2, isLoginSuccessful: false });
    };

    this.unsubscribe = this.props.attemptToLoginUser(successCallback, errorCallback);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _onAnimationEnd = () => {
    if (this.state.isLoginSuccessful) {
      return this.props.navigation.dispatch(toHomeScreen());
    } else {
      return this.props.navigation.dispatch(toLoginScreen());
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
        duration={2000}
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
