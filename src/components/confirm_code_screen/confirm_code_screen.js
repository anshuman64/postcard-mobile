// Library Imports
import React                                   from 'react';
import RN                                      from 'react-native';
import { PhoneNumberUtil, PhoneNumberFormat }  from 'google-libphonenumber';
import Ionicon                                 from 'react-native-vector-icons/Ionicons';

// Local Imports
import HeaderContainer          from '../header/header_container.js';
import { styles }               from './confirm_code_screen_styles.js';
import { toHomeScreen, goBack } from '../../actions/navigation_actions.js';
import { COLORS }               from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//

class ConfirmCodeScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isCodeIncorrect:      false,
      isResendSMSDisabled:  true,
      secsRemaining:        0, // set to 59 seconds in _startTimer()
      isLoading:            false,
    };

    this.timer = null;
    this.phoneUtil = PhoneNumberUtil.getInstance();

    this.render = this.render.bind(this);
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

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
    this.timer = setInterval(this._tick.bind(this), 1000);
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
        this.setState({ isLoading: false, isCodeIncorrect: false }, () => this.props.navigation.dispatch(toHomeScreen()))
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

  _renderHeader = () => {
    return (
      <HeaderContainer navigation={this.props.navigation} backIcon={true} />
    )
  }

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
        Sent to +14083060059{/* this.props.phoneNumber this.phoneUtil.format(this.phoneUtil.parse(this.props.phoneNumber), PhoneNumberFormat.INTERNATIONAL) */}
      </RN.Text>
    )
  }

  _renderCodeInput() {
    return (
      <RN.TextInput
        ref={(ref) => this.codeInput = ref}
        style={[styles.codeInput, this.state.isCodeIncorrect && styles.borderRed]}
        keyboardType='numeric'
        onChangeText={this._codeInputOnChangeText.bind(this)}
        value={this.state.inputtedCode}
        placeholder='-  -  -  -  -  -'
        autoFocus={true}
        maxLength={6}
        placeholderTextColor={COLORS.grey400}
        underlineColorAndroid={'transparent'}
        onFocus={() => !this.state.isCodeIncorrect && this.codeInput.setNativeProps({style: styles.borderHighlighted})}
        onEndEditing={() => !this.state.isCodeIncorrect && this.codeInput.setNativeProps({style: styles.codeInput})}
      />
    )
  }

  _renderInvalidCodeText() {
    if (this.state.isLoading) {
      return <RN.ActivityIndicator size='small' color={COLORS.grey400} />
    } else {
      return (
        <RN.Text style={[styles.invalidCodeText, !this.state.isCodeIncorrect && styles.invalidCodeTextTransparent]}>
          Invalid Code
        </RN.Text>
      )
    }
  }

  _renderResendSMS() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.resendSMSView.setNativeProps({style: styles.borderHighlighted})
          this.resendSMSText.setNativeProps({style: styles.textHighlighted})
        }}
        onPressOut={() => {
          this.resendSMSView.setNativeProps({style: styles.resendSMSView})
          this.resendSMSText.setNativeProps({style: styles.resendSMSText})
        }}
        onPress={() => this._onResendSMSPress()}
        disabled={this.state.isResendSMSDisabled}
        >
        <RN.View ref={(ref) => this.resendSMSView = ref} style={styles.resendSMSView}>
          <RN.Text ref={(ref) => this.resendSMSText = ref} style={[styles.resendSMSText, !this.state.isResendSMSDisabled && styles.smsTextActive]}>
            Resend SMS
          </RN.Text>
          <RN.Text style={[styles.resendSMSText, !this.state.isResendSMSDisabled && styles.smsTextActive]}>
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
          {this._renderHeader()}
          {this._renderTitle()}
          {this._renderSubtitle()}
          {this._renderCodeInput()}
          {this._renderInvalidCodeText()}
          <RN.View style={{flex: 1}} />
            {this._renderResendSMS()}
          <RN.View style={{flex: 4}} />
        </RN.View>
    )
  }
}


//--------------------------------------------------------------------//


export default ConfirmCodeScreen;
