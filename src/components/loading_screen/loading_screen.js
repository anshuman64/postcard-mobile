// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';

// Local Imports
import { styles }                          from './loading_screen_styles.js';
import * as Animations                     from './loading_screen_animations.js'
import { COLORS }                          from '../../utilities/style_utility.js';
import { toHomeScreen, toLoginScreen }     from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//


class LoadingScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
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

  render() {
    return (
      <RN.View style={styles.container}>
        <Animatable.Image
          style={styles.icon}
          source={require('../../assets/images/icon/Icon_ExactFit_200x200.png')}
          resizeMode='contain'
          animation={Animations.pulseIcon}
          easing='ease-out'
          iterationCount='infinite'
          direction='alternate'
          duration={2000}
          />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default LoadingScreen;
