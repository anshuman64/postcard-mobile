// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback }   from 'react-native';
import { connect }                          from 'react-redux';

// Local Imports
import { styles, scaleFactor }  from './confirm_code_screen_styles.js';
import { toPostsScreen }        from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//

class ConfirmCodeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isCodeInputFocused: false,
      isCodeIncorrect: false,
      isResendSMSDisabled: true,
      isResendSMSPressed: false,
      secsRemaining: 0
    };

    this.timer = null;

    this._codeInputOnChangeText = this._codeInputOnChangeText.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    this.timer = setInterval(this.tick, 1000);
    this.setState({isResendSMSDisabled: true, secsRemaining: 3})
  }

  stopTimer() {
    clearInterval(this.timer);
  }

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

  _codeInputOnChangeText(value) {
    // Debug test
    if (value.length === 6) {
      if (value === this.props.confirmationCodeObj) {
        console.error('SMS Code Verification Successful!');
      } else {
        this.setState({ isCodeIncorrect: true });
      }
    }

    // Real Firebase API
    // if (value.length === 6) {
    //   this.props.confirmCode(this.props.confirmationCodeObj, value);
    // }
  }

  _onResendSMSPress() {
    // Debug test
    this.props.debugGetConfirmationCode(this.props.phoneNumber);

    // Real Firebase API
    // this.props.getConfirmationCode(this.props.phoneNumber);

    this.startTimer();
  }

  render() {
    return (
      <View style={[styles.container]}>

        {/* Header */}
        <View style={[styles.headerView]}>
          <Text style={[styles.backText]}>
            Back
          </Text>
          <Text style={[styles.headerTitleText]}>
            Confirm Code
          </Text>
        </View>

        <View style={{flex: 3}} />

        {/* Top Text */}
        <Text style={[styles.titleText]}>
          Enter Confirmation Code
        </Text>
        <Text style={[styles.subtitleText]}>
          Sent to {this.props.phoneNumber}
        </Text>


        <View style={{flex: 1.5}} />

        {/* Code Input */}
        <TextInput
          style={[styles.codeInput, this.state.isCodeInputFocused && styles.borderHighlighted]}
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


        <View style={{flex: 3}} />

        {/* Resend SMS */}
        <TouchableWithoutFeedback
          onPressIn={this._setStateInAnimationFrame({ isResendSMSPressed: true})}
          onPressOut={this._setStateInAnimationFrame({ isResendSMSPressed: false})}
          onPress={() => this._onResendSMSPress()}
          disabled={this.state.isResendSMSDisabled}
          >
          <View style={[styles.resendSMSView, this.state.isResendSMSPressed && styles.borderHighlighted]}>
            <Text style={[styles.subtitleText, styles.resendSMSText, !this.state.isResendSMSDisabled && styles.smsTextActive, this.state.isResendSMSPressed && styles.smsTextHighlighted]}>
              Resend SMS
            </Text>
            <Text style={[styles.subtitleText, styles.resendSMSText, !this.state.isResendSMSDisabled && styles.smsTextActive, this.state.isResendSMSPressed && styles.smsTextHighlighted]}>
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
