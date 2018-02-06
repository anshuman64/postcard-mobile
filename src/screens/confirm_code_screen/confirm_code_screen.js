// Library Imports
import React                from 'react';
import RN                   from 'react-native';
import Firebase             from 'react-native-firebase';
import { PhoneNumberUtil }  from 'google-libphonenumber';

// Local Imports
import LoadingModal               from '../../components/loading_modal/loading_modal.js';
import { FRIEND_TYPES }           from '../../actions/friendship_actions.js';
import { POST_TYPES }             from '../../actions/post_actions.js';
import { styles }                 from './confirm_code_screen_styles.js';
import { UTILITY_STYLES, COLORS } from '../../utilities/style_utility.js';
import { defaultErrorAlert }      from '../../utilities/error_utility.js';


//--------------------------------------------------------------------//

class ConfirmCodeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

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

    this.unsubscribe = Firebase.auth().onAuthStateChanged((firebaseUserObj) => {
      if (firebaseUserObj) {
        this.setState({ isLoading: true }, () => {
          this.props.loginClient(firebaseUserObj)
            .then(() => {
              this._navigateTo();
            })
            .catch((error) => {
              defaultErrorAlert(error);
            })
            .finally(() => {
              this.setState({ isLoading: false });
            });
        });
      }
    });
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  // Starts Resend SMS timer
  _startTimer() {
    this.timer = setInterval(this._tick.bind(this), 1000);
    this.setState({ isResendSMSDisabled: true, secsRemaining: 59 })
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

  _navigateTo() {
    this._stopTimer();

    if (this.unsubscribe) {
      this.unsubscribe();
    }

    if (this.props.client.is_banned) {
      RN.Alert.alert('', 'This account has been disabled. Email support@insiya.io for more info.', [{text: 'OK', style: 'cancel'}]);
    } else {
      this._loadData()
        .then(() => {
          if (!this.props.usersCache[this.props.client.id].username) {
            return this.props.navigateTo('UsernameScreenLogin');
          } else {
            return this.props.navigateTo('HomeScreen');
          }
        })
        .catch((error) => {
          defaultErrorAlert(error);
        });
    }
  }

  async _loadData()  {
    for (let postType in POST_TYPES) {
      await this.props.getPosts(this.props.client.authToken, this.props.client.firebaseUserObj, true, this.props.client.id, POST_TYPES[postType], true);
    }

    for (let friendType in FRIEND_TYPES) {
      await this.props.getFriendships(this.props.client.authToken, this.props.client.firebaseUserObj, FRIEND_TYPES[friendType]);
    }
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Sends code to Firebase API as soon as user has inputted six digits
  _codeInputOnChangeText = (value) => {
    this.setState({ inputtedCode: value });

    if (value.length === 6) {
      this.setState({ isLoading: true }, () => {
        this.props.verifyConfirmationCode(this.props.confirmationCodeObj, value)
        .then(() => {
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
  _onResendSMSPress = () => {
    this.props.getConfirmationCode(this.props.phoneNumber)
      .catch((error) => {
        defaultErrorAlert(error)
      });

    this._startTimer();
  }

  _onFocus = () => {
    if (this.state.isCodeIncorrect) {
      this.codeInput.setNativeProps({style: [UTILITY_STYLES.borderRed, UTILITY_STYLES.textHighlighted]});
    } else {
      this.codeInput.setNativeProps({style: [UTILITY_STYLES.borderHighlighted, UTILITY_STYLES.textHighlighted]});
    }
  }

//--------------------------------------------------------------------//
// Render Methods
//--------------------------------------------------------------------//

  _renderTitle() {
    return (
      <RN.Text style={[UTILITY_STYLES.regularBlackText18, UTILITY_STYLES.marginTop50]}>
        Enter Confirmation Code
      </RN.Text>
    )
  }

  _renderSubtitle() {
    return (
      <RN.Text style={[UTILITY_STYLES.lightBlackText16, UTILITY_STYLES.marginTop5]}>
        Sent to {this.props.phoneNumber}
      </RN.Text>
    )
  }

  _renderCodeInput() {
    return (
      <RN.TextInput
        ref={(ref) => this.codeInput = ref}
        style={[styles.codeInput, this.state.isCodeIncorrect && UTILITY_STYLES.borderRed]}
        keyboardType='numeric'
        onChangeText={this._codeInputOnChangeText.bind(this)}
        value={this.state.inputtedCode}
        placeholder='-  -  -  -  -  -'
        autoFocus={true}
        maxLength={6}
        placeholderTextColor={COLORS.grey400}
        underlineColorAndroid={'transparent'}
        onFocus={this._onFocus}
        onEndEditing={() => this.codeInput.setNativeProps({style: styles.codeInput})}
      />
    )
  }

  _renderInvalidCodeText() {
    return (
      <RN.Text style={[styles.invalidCodeText, !this.state.isCodeIncorrect && UTILITY_STYLES.transparentText]}>
        Invalid Code
      </RN.Text>
    )
  }

  _renderResendSMS() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.resendSMSView.setNativeProps({style: UTILITY_STYLES.borderHighlighted})
          this.resendSMSText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          this.resendSMSView.setNativeProps({style: styles.resendSMSView})
          this.resendSMSText.setNativeProps({style: styles.resendSMSText})
        }}
        onPress={this._onResendSMSPress}
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

  _renderLoadingModal() {
    return (
      <LoadingModal isLoading={this.state.isLoading} />
    )
  }

  render() {
    return (
      <RN.KeyboardAvoidingView behavior={RN.Platform.OS === 'ios' ? 'padding' : null}>
        <RN.TouchableWithoutFeedback onPress={RN.Keyboard.dismiss} accessible={false}>
          <RN.View style={UTILITY_STYLES.containerStart}>
            {this._renderTitle()}
            {this._renderSubtitle()}
            {this._renderCodeInput()}
            {this._renderInvalidCodeText()}
            <RN.View style={{flex: 1}} />
              {this._renderResendSMS()}
            <RN.View style={{flex: 3}} />
            {this._renderLoadingModal()}
          </RN.View>
        </RN.TouchableWithoutFeedback>
      </RN.KeyboardAvoidingView>
    )
  }
}


//--------------------------------------------------------------------//


export default ConfirmCodeScreen;
