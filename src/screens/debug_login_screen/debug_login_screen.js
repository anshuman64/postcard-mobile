// Library Imports
import React from 'react';
import RN    from 'react-native';
import { Accelerometer, Gyroscope } from 'react-native-sensors';
import { decorator as sensors } from 'react-native-sensors';

import { Surface } from "gl-react-native";

// Local Imports
import { setStateCallback } from '../../utilities/function_utility.js';
import { styles }           from './debug_login_screen_styles.js';
import { UTILITY_STYLES }   from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


const accelerationObservable = new Accelerometer({
  updateInterval: 100, // defaults to 100ms
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
    };

    this.isNextPressed = false;

    accelerationObservable
      .map(({ x, y, z }) => x + y + z)
      .filter(speed => speed > 20)
      .subscribe(speed => console.log(`You moved your phone with ${speed}`));
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

  _renderDecorator() {
    const {
      Accelerometer,
      Gyroscope,
    } = this.props;

    if (!Accelerometer || !Gyroscope) {
      // One of the sensors is still initializing
      return null;
    }

    return (
        <RN.Text>
          AccelerationX has value: {Accelerometer.x + '\n'}
          AccelerationY has value: {Accelerometer.y+ '\n'}
          AccelerationZ has value: {Accelerometer.z+ '\n'}
        </RN.Text>
    );
  }

  _renderFilter() {
    return (
      <Surface width={256} height={171}>
        <Saturation
          factor={10}
          image={{ uri: "https://i.imgur.com/iPKTONG.jpg" }}
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



export default sensors({
  Accelerometer: {
    updateInterval: 300, // optional
  },
  Gyroscope: true,
})(DebugLoginScreen);
