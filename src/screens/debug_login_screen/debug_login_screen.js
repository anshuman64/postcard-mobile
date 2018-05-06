// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { styles }         from './debug_login_screen_styles';
import { UTILITY_STYLES } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class DebugLoginScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      emailInput:     'test1@insiya.io',
      passwordInput:  'socialnetwork',
    };

    this.isNextPressed = false;
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
        this.props.navigateTo('LoadingScreen');
      })
      .finally(() => {
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
        returnKeyType={RN.Platform.OS === 'ios' ? 'done' : null}
      />
    )
  }

  _renderPasswordInput() {
    return (
      <RN.TextInput
        style={styles.textInput}
        onChangeText={(value) => this.setState({ passwordInput: value })}
        value={this.state.passwordInput}
        underlineColorAndroid={'transparent'}
        returnKeyType={RN.Platform.OS === 'ios' ? 'done' : null}
      />
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableHighlight
        style={[UTILITY_STYLES.nextButtonBackground, UTILITY_STYLES.marginTop50]}
        onPress={this._onNextButtonPress}
        underlayColor={'#0050a7'}
        >
        <RN.Text style={UTILITY_STYLES.lightWhiteText16}>
          Next
        </RN.Text>
      </RN.TouchableHighlight>
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerCenter}>
        {this._renderLogo()}
        <RN.View style={styles.bottomView}>
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
