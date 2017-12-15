// Library Imports
import React                                    from 'react';
import RN                                       from 'react-native';
import * as _                                   from 'lodash';
import Firebase                                 from 'react-native-firebase';

// Local Imports
import { styles }                                      from './debug_login_screen_styles.js';
import { setStateCallback, setStateInAnimationFrame }  from '../../utilities/component_utility.js';
import { toHomeScreen }                                from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


class DebugLoginScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      emailInput:     'insiya@debug.io',
      passwordInput:  'password',
      isLoading:      false,
    };
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onNextButtonPress() {
    // Real Firebase API
    this.setState({isLoading: true}, () => {
    this.props.debugSignIn(this.state.emailInput, this.state.passwordInput)
      .then(() => {
        this.setState({ isLoading: false }, () => this.props.navigation.dispatch(toHomeScreen()));
      }).catch((error) => {
        console.error(error);
      });
    })
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderLogo() {
    return (
      <RN.View style={ styles.topView }>
        <RN.Image
          style={ styles.logo }
          source={require('../../assets/images/login_screen_logo/Logo_ExactFit_807x285.png')}
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
        { this.state.isLoading ?
          <RN.ActivityIndicator size='small' color='#bdbdbd' /> :
          <RN.Text style={styles.nextButtonText}>
            Next
          </RN.Text>
        }
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
