// Library Imports
import React                from 'react';
import RN                   from 'react-native';
import Firebase             from 'react-native-firebase';
import { PhoneNumberUtil }  from 'google-libphonenumber';

// Local Imports
import { styles }            from './confirm_code_screen_styles.js';
import { COLORS }            from '../../utilities/style_utility.js';
import { defaultErrorAlert } from '../../utilities/error_utility.js';


//--------------------------------------------------------------------//

class ConfirmCodeScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      inputtedCode:         '',
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
  _codeInputOnChangeText(value) {
    this.setState({ inputtedCode: value });

    if (value.length === 6) {
      this.setState({ isLoading: true }, () => {
        this.props.verifyConfirmationCode(this.props.confirmationCodeObj, value)
        .then(() => {
          this._stopTimer();
          
          if (!this.props.user.username) {
            return this.props.navigateTo('UsernameScreenLogin');
          } else {
            return this.props.navigateTo('HomeScreen');
          }

          this.setState({ isCodeIncorrect: false });
        })
        .catch((error) => {
          if (error.description === 'Firebase code verification failed') {
            this.setState({ isCodeIncorrect: true })
          } else {
            defaultErrorAlert(error);
          }
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
      });
    }
  }

  // Callback function to resend confirmation code via SMS and restart timer
  _onResendSMSPress() {
    this.props.getConfirmationCode(this.props.phoneNumber)
      .catch((error) => defaultErrorAlert(error));

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
        Sent to {this.props.phoneNumber}
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
        onFocus={() => !this.state.isCodeIncorrect && this.codeInput.setNativeProps({style: [styles.borderHighlighted, styles.textHighlighted]})}
        onEndEditing={() => !this.state.isCodeIncorrect && this.codeInput.setNativeProps({style: styles.codeInput})}
      />
    )
  }

  _renderInvalidCodeText() {
    if (this.state.isLoading) {
      return <RN.ActivityIndicator size='small' color={COLORS.grey400} />
    } else {
      return (
        <RN.Text style={[styles.invalidCodeText, !this.state.isCodeIncorrect && styles.transparentText]}>
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
          {this._renderTitle()}
          {this._renderSubtitle()}
          {this._renderCodeInput()}
          {this._renderInvalidCodeText()}
          <RN.View style={{flex: 1}} />
            {this._renderResendSMS()}
          <RN.View style={{flex: 3}} />
        </RN.View>
    )
  }
}


//--------------------------------------------------------------------//


export default ConfirmCodeScreen;