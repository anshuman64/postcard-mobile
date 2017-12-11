// Library Imports
import React                                   from 'react';
import RN                                      from 'react-native';
import { PhoneNumberUtil, PhoneNumberFormat }  from 'google-libphonenumber';
import Icon                                    from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles }                   from './confirm_code_screen_styles.js';
import { setStateInAnimationFrame } from '../../utilities/component_utility.js';
import { toMainNavigator, goBack }  from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//

class ConfirmCodeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isBackIconPressed:    false,
      isCodeInputFocused:   false,
      isCodeIncorrect:      false,
      isResendSMSDisabled:  true,
      isResendSMSPressed:   false,
      secsRemaining:        0, // set to 59 seconds in _startTimer()
      isLoading:            false,
      isCodeInvalid:        false,
    };

    this.timer = null;
    this.phoneUtil = PhoneNumberUtil.getInstance();

    this._codeInputOnChangeText = this._codeInputOnChangeText.bind(this);
    this._tick = this._tick.bind(this);
    this.render = this.render.bind(this);
  }

  componentDidMount() {
    this._startTimer();
  }

  componentWillUnmount() {
    this._stopTimer();
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  // Starts Resend SMS timer
  _startTimer() {
    this.timer = setInterval(this._tick, 1000);
    this.setState({isResendSMSDisabled: true, secsRemaining: 59})
  }

  // Stops Resend SMS timer
  _stopTimer() {
    clearInterval(this.timer);
  }

  // Updates Resend SMS timer every second
  _tick() {
    this.setState({ secsRemaining: this.state.secsRemaining - 1 }, () => {
      if (this.state.secsRemaining <= 0) {
        this._stopTimer();
        this.setState({ isResendSMSDisabled: false })
      }
    });
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Sends code to Firebase API as soon as user has inputted six digits
  // TODO: handle error callback if code is invalid
  _codeInputOnChangeText(value) {
    // Debug test
    // if (value.length === 6) {
    //   if (value === this.props.confirmationCodeObj) {
    //     this.setState({ isCodeIncorrect: false }, () => this.props.navigation.dispatch(toMainNavigator()));
    //   } else {
    //     this.setState({ isCodeIncorrect: true });
    //   }
    // }

    // Real Firebase API
    if (value.length === 6) {
      this.setState({ isLoading: true }, () => {
      this.props.verifyConfirmationCode(this.props.phoneNumber, this.props.confirmationCodeObj, value).then(() => {
        this.setState({ isLoading: false, isCodeIncorrect: false }, () => this.props.navigation.dispatch(toMainNavigator()))
      }).catch(() => this.setState({ isLoading: false, isCodeIncorrect: true }))
      })
    }
  }

  // Callback function to return to login screen
  _onBackIconPress() {
    this.props.navigation.dispatch(goBack());
  }

  // Callback function to resend confirmation code via SMS and restart timer
  _onResendSMSPress() {
    // Debug test
    this.props.debugGetConfirmationCode(this.props.phoneNumber);

    // Real Firebase API
    // this.props.getConfirmationCode(this.props.phoneNumber);

    this._startTimer();
  }

//--------------------------------------------------------------------//
// Render Methods
//--------------------------------------------------------------------//

  _renderTitle() {
    return (
      <RN.Text style={styles.titleText}>
        Enter Confirmation Code
      </RN.Text>
    )
  }

  _renderSubtitle() {
    return (
      <RN.Text style={styles.subtitleText}>
        Sent to { this.props.phoneNumber /*this.phoneUtil.format(this.phoneUtil.parse(this.props.phoneNumber), PhoneNumberFormat.INTERNATIONAL) */}
      </RN.Text>
    )
  }

  _renderCodeInput() {
    return (
      <RN.TextInput
        style={[styles.codeInput, this.state.isCodeInputFocused && styles.borderHighlighted, this.state.isCodeIncorrect && styles.borderRed]}
        keyboardType='numeric'
        onChangeText={this._codeInputOnChangeText}
        value={this.state.inputtedCode}
        placeholder='-  -  -  -  -  -'
        autoFocus={true}
        maxLength={6}
        placeholderTextColor='#bdbdbd'
        underlineColorAndroid={'transparent'}
        onFocus={setStateInAnimationFrame(this, { isCodeInputFocused: true})}
        onEndEditing={setStateInAnimationFrame(this, { isCodeInputFocused: false})}
      />
    )
  }

  _renderInvalidCodeText() {
    if (this.state.isLoading) {
      return <RN.ActivityIndicator size='small' color='#bdbdbd' />
    } else if (this.state.isCodeIncorrect) {
      return (
        <RN.Text style={styles.invalidCodeText}>
          Invalid Code
        </RN.Text>
      )
    }
  }

  _renderResendSMS() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={setStateInAnimationFrame(this, { isResendSMSPressed: true})}
        onPressOut={setStateInAnimationFrame(this, { isResendSMSPressed: false})}
        onPress={() => this._onResendSMSPress()}
        disabled={this.state.isResendSMSDisabled}
        >
        <RN.View style={styles.resendSMSView}>
          <RN.Text style={[styles.resendSMSText, !this.state.isResendSMSDisabled && styles.smsTextActive, this.state.isResendSMSPressed && styles.textHighlighted]}>
            Resend SMS
          </RN.Text>
          <RN.Text style={[styles.resendSMSText, !this.state.isResendSMSDisabled && styles.smsTextActive, this.state.isResendSMSPressed && styles.textHighlighted]}>
            {/* Displays countdown timer in clean format */}
            {this.state.isResendSMSDisabled ? '0:' + (this.state.secsRemaining < 10 ? '0'+this.state.secsRemaining : this.state.secsRemaining) : ''}
          </RN.Text>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <RN.View style={styles.container}>
        <RN.View style={{flex: 3}} />
          {this._renderTitle()}
          {this._renderSubtitle()}
        <RN.View style={{flex: 1.5}} />
          {this._renderCodeInput()}
          {this._renderInvalidCodeText()}
        <RN.View style={{flex: 5}} />
          {this._renderResendSMS()}
        <RN.View style={{flex: 18}} />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//


export default ConfirmCodeScreen;
