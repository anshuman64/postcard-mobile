// Library Imports
import React                                                                    from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback }  from 'react-native';
import { connect }                                                              from 'react-redux';
import { PhoneNumberUtil, PhoneNumberFormat }                                   from 'google-libphonenumber';
import Icon                                                                     from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles, scaleFactor }          from './confirm_code_screen_styles.js';
import { toPostsScreen, toBackScreen }  from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//

class ConfirmCodeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isBackIconPressed: false,
      isCodeInputFocused: false,
      isCodeIncorrect: false,
      isResendSMSDisabled: true,
      isResendSMSPressed: false,
      secsRemaining: 0, // set to 59 seconds in startTimer()
      isCodeInvalid: false,
    };

    this.timer = null;
    this.phoneUtil = PhoneNumberUtil.getInstance();

    this._codeInputOnChangeText = this._codeInputOnChangeText.bind(this);
    this.tick = this.tick.bind(this);
    this.render = this.render.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  // Starts Resend SMS timer
  startTimer() {
    this.timer = setInterval(this.tick, 1000);
    this.setState({isResendSMSDisabled: true, secsRemaining: 59})
  }

  // Stops Resend SMS timer
  stopTimer() {
    clearInterval(this.timer);
  }

  // Updates Resend SMS timer every second
  tick() {
    this.setState({ secsRemaining: this.state.secsRemaining - 1 }, () => {
      if (this.state.secsRemaining <= 0) {
        this.stopTimer();
        this.setState({ isResendSMSDisabled: false })
      }
    });
  }

  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  // Sends code to Firebase API as soon as user has inputted six digits
  // TODO: handle error callback if code is invalid
  _codeInputOnChangeText(value) {
    // Debug test
    // if (value.length === 6) {
    //   if (value === this.props.confirmationCodeObj) {
    //     console.error('SMS Code Verification Successful!');
    //   } else {
    //     this.setState({ isCodeIncorrect: true });
    //   }
    // }

    // Real Firebase API
    if (value.length === 6) {
      this.props.verifyConfirmationCode(this.props.confirmationCodeObj, value);
    }
  }

  // Callback function to return to login screen
  _onBackIconPress() {
    this.props.navigation.dispatch(toBackScreen());
  }

  // Callback function to resend confirmation code via SMS and restart timer
  _onResendSMSPress() {
    // Debug test
    // this.props.debugGetConfirmationCode(this.props.phoneNumber);

    // Real Firebase API
    this.props.getConfirmationCode(this.props.phoneNumber);

    this.startTimer();
  }

  render() {
    return (
      <View style={[styles.container]}>

        {/* Header */}
        <View style={[styles.headerView]}>
          <TouchableWithoutFeedback
            onPressIn={this._setStateInAnimationFrame({ isBackIconPressed: true})}
            onPressOut={this._setStateInAnimationFrame({ isBackIconPressed: false})}
            onPress={() => this._onBackIconPress()}
            >
             <Icon name='ios-arrow-round-back-outline' style={[styles.backIcon, this.state.isBackIconPressed && styles.textHighlighted]} />
         </TouchableWithoutFeedback>
       </View>

        <View style={{flex: 3}} />

        {/* Top Text */}
        <Text style={[styles.titleText]}>
          Enter Confirmation Code
        </Text>
        <Text style={[styles.subtitleText]}>
          {/* Displays phone number in clean format */}
          Sent to { this.phoneUtil.format(this.phoneUtil.parse(this.props.phoneNumber), PhoneNumberFormat.INTERNATIONAL) }
        </Text>


        <View style={{flex: 1.5}} />

        {/* Code Input */}
        <TextInput
          style={[styles.codeInput, this.state.isCodeInputFocused && styles.borderHighlighted, this.state.isCodeInvalid && styles.borderRed]}
          keyboardType='numeric'
          onChangeText={this._codeInputOnChangeText}
          value={this.state.inputtedCode}
          placeholder='-  -  -  -  -  -'
          autoFocus={true}
          maxLength={6}
          placeholderTextColor='#bdbdbd'
          underlineColorAndroid={'transparent'}
          onFocus={this._setStateInAnimationFrame({ isCodeInputFocused: true})}
          onEndEditing={this._setStateInAnimationFrame({ isCodeInputFocused: false})}
        />

        {/* Invalid Code Text */}
        {this.state.isCodeInvalid &&
          <Text style={[styles.invalidCodeText]}>
            Invalid Code
          </Text>
        }

        <View style={{flex: 5}} />

        {/* Resend SMS */}
        <TouchableWithoutFeedback
          onPressIn={this._setStateInAnimationFrame({ isResendSMSPressed: true})}
          onPressOut={this._setStateInAnimationFrame({ isResendSMSPressed: false})}
          onPress={() => this._onResendSMSPress()}
          disabled={this.state.isResendSMSDisabled}
          >
          <View style={[styles.resendSMSView]}>
            <Text style={[styles.subtitleText, styles.resendSMSText, !this.state.isResendSMSDisabled && styles.smsTextActive, this.state.isResendSMSPressed && styles.textHighlighted]}>
              Resend SMS
            </Text>
            <Text style={[styles.subtitleText, styles.resendSMSText, !this.state.isResendSMSDisabled && styles.smsTextActive, this.state.isResendSMSPressed && styles.textHighlighted]}>
              {/* Displays countdown timer in clean format */}
              {this.state.isResendSMSDisabled ? '0:' + (this.state.secsRemaining < 10 ? '0'+this.state.secsRemaining : this.state.secsRemaining) : ''}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={{flex: 18}} />
      </View>
    )
  }
}


//--------------------------------------------------------------------//


export default ConfirmCodeScreen;
