// Library Imports
import React from 'react';
import RN    from 'react-native';
import { Accelerometer, Gyroscope } from 'react-native-sensors';
import { decorator as sensors } from 'react-native-sensors';

import { Surface } from "gl-react-native";

import Saturation from "./Saturation";
// Local Imports
import { setStateCallback } from '../../utilities/function_utility.js';
import { styles }           from './debug_login_screen_styles.js';
import { UTILITY_STYLES }   from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


const accelerationObservable = new Accelerometer({
  updateInterval: 50, // defaults to 100ms
});

class DebugLoginScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      emailInput:     'test@insiya.io',
      passwordInput:  'socialnetwork',
      x: new RN.Animated.Value(0),
      y: new RN.Animated.Value(0),
      z: new RN.Animated.Value(0),
    };

    this.isNextPressed = false;
  }

  componentDidMount() {
    // Normal RxJS functions
    accelerationObservable
        .subscribe(({x, y, z}) => this.setState({
          x: new RN.Animated.Value(x),
          y: new RN.Animated.Value(y),
          z: new RN.Animated.Value(z),
        }));
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onNextButtonPress = () => {
    if (this.isNextPressed) {
      return;
    }

    this.isNextPressed = true;

    this.props.debugSignIn(this.state.emailInput, this.state.passwordInput)
      .then(() => {
        if (!this.props.user.username) {
          return this.props.navigateTo('UsernameScreenLogin');
        } else {
          return this.props.navigateTo('HomeScreen');
        }
      })
      .catch((error) => {
        // console.error(error); // Debug Test
        this.isNextPressed = false;
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderLogo() {
    return (
      <RN.View style={styles.topView}>
        <RN.Image
          style={styles.logo}
          source={require('../../assets/images/logo/logo.png')}
          resizeMode='contain'
          />
      </RN.View>
    )
  }

  _renderEmailInput() {
    return (
      <RN.TextInput
        style={styles.textInput}
        onChangeText={(value) => this.setState({ emailInput: value })}
        value={this.state.emailInput}
        underlineColorAndroid={'transparent'}
      />
    )
  }

  _renderPasswordInput() {
    return (
      <RN.TextInput
        style={styles.textInput}
        onChangeText={(value) => this.setState({ emailInput: value })}
        value={this.state.passwordInput}
        underlineColorAndroid={'transparent'}
      />
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableHighlight
        style={[UTILITY_STYLES.nextButtonBackground, UTILITY_STYLES.marginTop50]}
        onPress={this._onNextButtonPress}
        underlayColor='#0050a7'
        >
        <RN.Text style={UTILITY_STYLES.lightWhiteText16}>
          Next
        </RN.Text>
      </RN.TouchableHighlight>
    )
  }

  _renderFilter() {
    const saturation = this.state.x.interpolate({
      inputRange: [-3, 0, 3],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    return (
      <Surface width={400} height={400}>
        <Saturation
          factor={saturation}
          image={{ uri: "https://s3.amazonaws.com/insiya-users/1/posts/e5705aa0-0213-11e8-9fbb-bb0961a4d07b.jpeg" }}
        />
      </Surface>
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerCenter}>
        {this._renderFilter()}
      </RN.View>
    )
  }
}


// --------------------------------------------------------------------



export default DebugLoginScreen;
