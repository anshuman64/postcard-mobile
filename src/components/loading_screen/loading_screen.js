// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';

// Local Imports
import { styles }                          from './loading_screen_styles.js';
import * as Animations                     from './loading_screen_animations.js';
import { setStateInAnimationFrame }        from '../../utilities/function_utility.js';
import { COLORS }                          from '../../utilities/style_utility.js';
import { toHomeScreen, toLoginScreen }     from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//


class LoadingScreen extends React.PureComponent {
  static navigationOptions = {
    header:        null,
  }

  constructor(props) {
    super(props);

    this.state = {
      animationState: 0,
    }
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    let successCallback = () => {
      this.props.navigation.dispatch(toHomeScreen());
    };

    let errorCallback = () => {
      this.props.navigation.dispatch(toLoginScreen());
    };

    setTimeout(this.startTransition.bind(this), 1000);

      // setTimeout(this.yoohoo.bind(this), 800);
    // this.unsubscribe = this.props.attemptToLoginUser(successCallback, errorCallback);
  }

  startTransition() {
    this.refs.loadingIcon.stopAnimation();
    this.setState({animationState: 1});
  }

  yoohoo() {
    this.props.navigation.dispatch(toHomeScreen())
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

_renderLoadingIcon() {
  switch (this.state.animationState) {
    case 0:
      return (
        <Animatable.Image
          ref={'loadingIcon'}
          style={styles.icon}
          source={require('../../assets/images/icon/Icon_ExactFit_200x200.png')}
          resizeMode='contain'
          animation={Animations.pulseIcon}
          easing='ease-out'
          iterationCount='infinite'
          direction='alternate'
          duration={2000}
          />
      )
    case 1:
      return (
        <Animatable.Image
          style={styles.icon}
          source={require('../../assets/images/icon/Icon_ExactFit_200x200.png')}
          resizeMode='contain'
          animation={'fadeOut'}
          iterationCount={1}
          duration={1500}
          onAnimationEnd={() => this.props.navigation.dispatch(toLoginScreen())}
          />
      )
  }
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
