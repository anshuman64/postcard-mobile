// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { styles } from './debug_login_screen_styles.js';


//--------------------------------------------------------------------//


class DebugLoginScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      emailInput:     'debug@insiya.io',
      passwordInput:  'password',
    };

    this.isNextPressed = false;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onNextButtonPress() {
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
        console.error(error);
        this.isNextPressed = false;
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderLogo() {
    return (
      <RN.View style={ styles.topView }>
        <RN.Image
          style={ styles.logo }
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
        onChangeText={(value) => setState({ emailInput: value })}
        value={this.state.emailInput}
        underlineColorAndroid={'transparent'}
      />
    )
  }

  _renderPasswordInput() {
    return (
      <RN.TextInput
        style={styles.textInput}
        onChangeText={(value) => setState({ emailInput: value })}
        value={this.state.passwordInput}
        underlineColorAndroid={'transparent'}
        secureTextEntry={true}
      />
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableHighlight
        style={ styles.nextButtonBackground }
        onPress={() => this._onNextButtonPress()}
        underlayColor='#0050a7'
        >
        <RN.Text style={styles.nextButtonText}>
          Next
        </RN.Text>
      </RN.TouchableHighlight>
    )
  }

  render() {
    return (
      <RN.View style={ styles.container }>
        {this._renderLogo()}
        <RN.View style={ styles.bottomView }>
          {this._renderEmailInput()}
          {this._renderPasswordInput()}
          {this._renderNextButton()}
        </RN.View>
      </RN.View>
    )
  }
}


// --------------------------------------------------------------------


export default DebugLoginScreen;
