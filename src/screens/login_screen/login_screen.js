// Library Imports
import React                   from 'react';
import RN                      from 'react-native';
import _                       from 'lodash';
import { AsYouTypeFormatter }  from 'google-libphonenumber';
import Ionicon                 from 'react-native-vector-icons/Ionicons';

// Local Imports
import LoadingModal                from '../../components/loading_modal/loading_modal';
import ListModalContainer          from '../../components/list_modal/list_modal_container';
import { styles }                  from './login_screen_styles';
import { COUNTRY_CODES }           from '../../utilities/country_utility';
import { setStateCallback }        from '../../utilities/function_utility';
import { UTILITY_STYLES, COLORS }  from '../../utilities/style_utility';
import { defaultErrorAlert }       from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class LoginScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      countryIndex:             220, // hard-coded to United States
      formattedPhoneNumber:     '',
      isModalVisible:           false,
      isNextButtonDisabled:     true,
      isLoading:                false,
      isPhoneNumberInvalid:     false,
    };

    this.formatter = new AsYouTypeFormatter(COUNTRY_CODES[this.state.countryIndex].country_code); // libphonenumber object that formats phone numbers by country as each character is typed
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Callback function used for Cancel button in ListModal
  setParentState = (state) => {
    this.setState(state);
  }

  // Callback function for setting country selector and updating phone number formatting
  setCountry = (index) => {
    let func = () => {
      let tempFormatted = '';
      // Create new libphonenumber formatter for new country
      this.formatter = new AsYouTypeFormatter(COUNTRY_CODES[index].country_code);
      // Try extracting raw number input from phone number and readding each character to formatter; escape if nothing to format
      try {
        tempFormatted = this.state.formattedPhoneNumber.match(/[\d+]/g).join('');
        _.forEach(tempFormatted, (char) => tempFormatted = this.formatter.inputDigit(char));
      } catch (e) {}

      this.setState({ countryIndex: index, formattedPhoneNumber: tempFormatted, isModalVisible: false }, this._checkNextButtonEnable);
    }

    return func;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Callback function for formatting phone number on each character typed
  _onPhoneInputChangeText = (value) => {
    let formatted;

    if (value.length >= this.state.formattedPhoneNumber.length) {
      // Adds only the last last character to libphonenumber formatter; formatter object saves previous characters
      formatted = this.formatter.inputDigit(value[value.length - 1]);
    }
    // Condition if delete key was pressed
    else {
      // Delete last character of formatted number
      formatted = this.state.formattedPhoneNumber.slice(0, -1);
      // Reset formatter because it does not have remove digit functionality
      this.formatter.clear();
      // Loop through formatted string and add digits to formatter one by one
      _.forEach(formatted, (char) => formatted = this.formatter.inputDigit(char));
    }

    this.setState({ formattedPhoneNumber: formatted }, this._checkNextButtonEnable);
  }

  // Enables Next button only when phone number is greater than 5 digits
  _checkNextButtonEnable = () => {
    let phoneUtilNumber;

    try {
      phoneUtilNumber = this.state.formattedPhoneNumber.match(/[\d+]/g).join('');

      if (phoneUtilNumber.length >= 5) {
        this.setState({isNextButtonDisabled: false});
      } else {
        this.setState({isNextButtonDisabled: true});
      }
    } catch (e) {}
  }

  // Callback function that extracts raw numbers from phone number, adds country code, and sends to Firebase API
  _onNextButtonPress = () => {
    let number = this.state.formattedPhoneNumber.match(/[\d+]/g).join('');

    // If the user has not added their own country code in, add the one from the ListModal
    if (number[0] != '+') {
      number = COUNTRY_CODES[this.state.countryIndex].dialing_code + number;
    }

    this.setState({ isLoading: true }, () => {
      this.props.getConfirmationCode(number)
       .then((confirmationCodeObj) => {
         this.props.navigateTo('ConfirmCodeScreen', { phoneNumber: number, confirmationCodeObj: confirmationCodeObj });
         this.setState({ isPhoneNumberInvalid: false });
       })
       .catch((error) => {
         // console.error(error) // Debug Test
         if (error.description === 'Firebase phone sign-in failed') {
           this.setState({ isPhoneNumberInvalid: true });
         } else {
           defaultErrorAlert(error);
         }
       })
       .finally(() => {
         this.setState({ isLoading: false});
       });
    });
  }

  _onFocus = () => {
    if (this.state.isPhoneNumberInvalid) {
      this.phoneInput.setNativeProps({style: [UTILITY_STYLES.borderRed, UTILITY_STYLES.textHighlighted]});
    } else {
      this.phoneInput.setNativeProps({style: [UTILITY_STYLES.borderHighlighted, UTILITY_STYLES.textHighlighted]});
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderLogo() {
    return(
      <RN.Image style={styles.logo} source={require('../../assets/images/logo/logo.png')} resizeMode='contain' />
    )
  }

  _renderCountrySelector() {
    return (
      <RN.TouchableWithoutFeedback
        onPress={setStateCallback(this, { isModalVisible: true })}
        onPressIn={() => {
          this.countrySelectorView.setNativeProps({style: UTILITY_STYLES.borderHighlighted})
          this.countrySelectorText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          this.dropdownIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          this.countrySelectorView.setNativeProps({style: styles.countrySelectorView})
          this.countrySelectorText.setNativeProps({style: [UTILITY_STYLES.lightBlackText18, styles.countrySelectorTextWidth]})
          this.dropdownIcon.setNativeProps({style: styles.dropdownIcon})
        }}
        >
        <RN.View ref={(ref) => this.countrySelectorView = ref} style={styles.countrySelectorView}>
          <RN.Text allowFontScaling={false} ref={(ref) => this.countrySelectorText = ref} style={[UTILITY_STYLES.lightBlackText18, styles.countrySelectorTextWidth]}>
            {COUNTRY_CODES[this.state.countryIndex].country_name}
          </RN.Text>
          <Ionicon name='md-arrow-dropdown' ref={(ref) => this.dropdownIcon = ref} style={styles.dropdownIcon} />
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderPhoneNumberInput() {
    return (
      <RN.View style={styles.phoneNumberView}>
        {/* PhoneNumberCountryCode */}
        <RN.View style={styles.countryCodeTextView}>
          <RN.Text allowFontScaling={false} style={UTILITY_STYLES.lightBlackText18}>
            {COUNTRY_CODES[this.state.countryIndex].dialing_code}
          </RN.Text>
        </RN.View>

        {/* PhoneNumberInput */}
          <RN.TextInput
            ref={(ref) => this.phoneInput = ref}
            style={[styles.phoneNumberInput, this.state.isPhoneNumberInvalid && UTILITY_STYLES.borderRed]}
            keyboardType='phone-pad'
            onChangeText={this._onPhoneInputChangeText.bind(this)}
            value={this.state.formattedPhoneNumber}
            placeholder='Phone Number'
            placeholderTextColor={COLORS.grey400}
            returnKeyType={RN.Platform.OS === 'ios' ? 'done' : null}
            underlineColorAndroid={'transparent'}
            onFocus={this._onFocus}
            onEndEditing={() => this.phoneInput.setNativeProps({style: [styles.phoneNumberInput, this.state.isPhoneNumberInvalid && UTILITY_STYLES.borderRed]})}
            />
      </RN.View>
    )
  }

  _renderInvalidNumberText() {
    return (
      <RN.View style={styles.invalidNumberTextView}>
        <RN.Text allowFontScaling={false} style={[styles.invalidNumberText, !this.state.isPhoneNumberInvalid && UTILITY_STYLES.transparentText]}>
          Invalid Number
        </RN.Text>
      </RN.View>
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableOpacity
        style={[UTILITY_STYLES.nextButtonBackground, this.state.isNextButtonDisabled && UTILITY_STYLES.nextButtonBackgroundDisabled, {marginTop: 20}]}
        onPress={this._onNextButtonPress}
        disabled={this.state.isNextButtonDisabled || this.state.isLoading}
        >
        <RN.Text allowFontScaling={false} style={[UTILITY_STYLES.lightWhiteText18, this.state.isNextButtonDisabled && UTILITY_STYLES.nextButtonTextDisabled]}>
          Next
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderSMSNoticeText() {
    return (
      <RN.Text allowFontScaling={false} style={styles.smsNoticeText}>
        {"We'll send an SMS message to verify your phone number"}
      </RN.Text>
    )
  }

  _renderListModal() {
    return (
      <ListModalContainer isModalVisible={this.state.isModalVisible} countryIndex={this.state.countryIndex} setParentState={this.setParentState} setCountry={this.setCountry} />
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
            <RN.View style={{flex: 1}} />
            {this._renderLogo()}
            {this._renderCountrySelector()}
            {this._renderPhoneNumberInput()}
            {this._renderInvalidNumberText()}
            {this._renderNextButton()}
            {this._renderSMSNoticeText()}
            <RN.View style={{flex: 1.5}} />
            {this._renderListModal()}
            {this._renderLoadingModal()}
          </RN.View>
        </RN.TouchableWithoutFeedback>
      </RN.KeyboardAvoidingView>
    )
  }
}

// --------------------------------------------------------------------


export default LoginScreen;
