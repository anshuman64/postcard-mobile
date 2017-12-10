// Library Imports
import React                                                                                                               from 'react';
import * as RN from 'react-native';
import * as _                                                                                                              from 'lodash';
import { PhoneNumberUtil, AsYouTypeFormatter }                                                                             from 'google-libphonenumber';
import firebase                                                                                                            from 'react-native-firebase';
import Icon                                                                                                                from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles, scaleFactor }  from './login_screen_styles.js';
import CountryListModal         from './country_list_modal.js';
import countryCodes             from '../../resources/country_codes.js';
import { toConfirmCodeScreen }  from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      countryIndex: 220, // hard-coded to United States
      isCountrySelectorPressed: false,
      isPhoneInputFocused: false,
      formattedPhoneNumber: '',
      isModalVisible: false,
      isNextButtonDisabled: true,
      isLoading: false,
      isPhoneNumberInvalid: false,
    };

    this.unsubscribe = null;
    this.formatter = new AsYouTypeFormatter(countryCodes[this.state.countryIndex].country_code); // libphonenumber object that formats phone numbers by country as each character is typed
    this.phoneUtil = PhoneNumberUtil.getInstance(); // libphonenumber object used to parse phone numbers
  }

  // Callback function for setting state
  _setState = (state) => {
    return(
      () => (this.setState(state))
    )
  }

  // Callback function for setting state in animation frame; recommended by React Native docs for animations
  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  // Callback function for formatting phone number on each character typed
  // TODO: handle error callback if phone number is invalid
  _onPhoneInputChangeText(value) {
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

    this.setState({formattedPhoneNumber: formatted}, () => this.checkNextButtonEnable());
  }

  // Callback function for setting country selector and updating phone number formatting
  setCountry = (index) => {
    return(
      () => {
        let tempFormatted = '';
        // Create new libphonenumber formatter for new country
        this.formatter = new AsYouTypeFormatter(countryCodes[index].country_code);
        // Try extracting raw number input from phone number and readding each character to formatter; escape if nothing to format
        try {
          tempFormatted = this.state.formattedPhoneNumber.match(/[\d+]/g).join('');
          _.forEach(tempFormatted, (char) => tempFormatted = this.formatter.inputDigit(char));
        } catch (e) {}

        this.setState({ countryIndex: index, formattedPhoneNumber: tempFormatted, isModalVisible: false }, () => this.checkNextButtonEnable());
      }
    )
  }

  // Enables Next button only when libphonenumber believes phone number is "possible"
  checkNextButtonEnable() {
    let phoneUtilNumber;

    try {
      phoneUtilNumber = this.phoneUtil.parse(this.state.formattedPhoneNumber, countryCodes[this.state.countryIndex].country_code);

      if (this.phoneUtil.isPossibleNumber(phoneUtilNumber)) {
        this.setState({isNextButtonDisabled: false});
      } else {
        this.setState({isNextButtonDisabled: true});
      }
    } catch (e) {}
  }

  // Callback function that extracts raw numbers from phone number, adds country code, and sends to Firebase API
  _onNextButtonPress() {
    let number = this.state.formattedPhoneNumber.match(/[\d+]/g).join('');
    if (number[0] != '+') {
      number = countryCodes[this.state.countryIndex].dialing_code + number;
    }

    // Debug test
    if (number === '+14088888888') {
      this.setState({isPhoneNumberInvalid: true});
    } else {
      this.setState({isLoading: true});
      this.props.debugGetConfirmationCode(number)
        .then(this.setState({isLoading: false, isPhoneNumberInvalid: false}, () => this.props.navigation.dispatch(toConfirmCodeScreen())))
    }

    // Real Firebase API
    // this.setState({isLoading: true}, () => {
    // this.props.getConfirmationCode(number)
    //  .then(() => this.setState({isLoading: false, isPhoneNumberInvalid: false}, () => this.props.navigation.dispatch(toConfirmCodeScreen())))
    //  .catch(() => this.setState({isLoading: false, isPhoneNumberInvalid: true}))
    // })
  }

  render() {
    return (
      <RN.View style={[styles.flex, styles.container]}>
        {/* Top section of view with Insiya logo */}
        <RN.View style={[styles.flex, styles.topView]}>
          <RN.Image
            style={styles.logo}
            source={require('../../resources/images/login_screen_logo/Logo_ExactFit_807x285.png')}
            resizeMode='contain'
          />
        </RN.View>

        {/* Bottom section of view with CountrySelector, PhoneNumberInput, and NextButton */}
        <RN.View style={[styles.bottomView]}>
          <RN.View style={{flex: 1}} />

          {/* CountrySelector */}
          <RN.TouchableWithoutFeedback
            onPress={this._setState({ isModalVisible: true})}
            onPressIn={this._setStateInAnimationFrame({ isCountrySelectorPressed: true})}
            onPressOut={this._setStateInAnimationFrame({ isCountrySelectorPressed: false})}
            >
            <RN.View style={[styles.countrySelectorView, styles.componentSize, styles.border, this.state.isCountrySelectorPressed && styles.borderHighlighted]}>
              <RN.Text style={[styles.componentSize, styles.text]}>
                {countryCodes[this.state.countryIndex].country_name}
              </RN.Text>
              <Icon name='md-arrow-dropdown' style={[styles.dropdownIcon]} />
            </RN.View>
          </RN.TouchableWithoutFeedback>

          <RN.View style={{height: 5 * scaleFactor}} />

            {/* PhoneNumber */}
            <RN.View style={[styles.componentSize, styles.phoneNumberView]}>
              {/* PhoneNumberCountryCode */}
              <RN.Text style={[styles.phoneNumberCountryCode, styles.text, styles.border]}>
                {countryCodes[this.state.countryIndex].dialing_code}
              </RN.Text>

              {/* PhoneNumberInput */}
              <RN.TextInput
                style={[styles.phoneNumberInput, styles.text, styles.border, this.state.isPhoneInputFocused && styles.borderHighlighted, this.state.isPhoneNumberInvalid && styles.borderRed]}
                keyboardType='phone-pad'
                onChangeText={(value) => this._onPhoneInputChangeText(value)}
                value={this.state.formattedPhoneNumber}
                placeholder='Phone Number'
                placeholderTextColor='#bdbdbd'
                underlineColorAndroid={'transparent'}
                onFocus={this._setStateInAnimationFrame({ isPhoneInputFocused: true})}
                onEndEditing={this._setStateInAnimationFrame({ isPhoneInputFocused: false})}
              />
            </RN.View>

            {/* Invalid Number RN.Text */}
            {this.state.isPhoneNumberInvalid &&
              <RN.View style={[styles.componentSize, styles.phoneNumberView]}>
                <RN.View style={{width: '25%'}} />
                <RN.Text style={[styles.invalidNumberText]}>
                  Invalid Number
                </RN.Text>
              </RN.View>
            }

          <RN.View style={{flex: 2}} />

            {/* NextButton */}
            <RN.TouchableHighlight
              style={[styles.componentSize, styles.nextButtonBackgroundEnabled]}
              onPress={() => this._onNextButtonPress()}
              underlayColor='#0050a7'
              disabled={this.state.isNextButtonDisabled && this.state.isLoading}
              >
              { this.state.isLoading ?
                <RN.ActivityIndicator size='small' color='#bdbdbd' style={[styles.activityIndicator]} /> :
                <RN.Text style={[styles.componentSize, styles.text, styles.nextButtonTextDisabled, !this.state.isNextButtonDisabled && styles.nextButtonTextEnabled]}>
                  Next
                </RN.Text>
              }
            </RN.TouchableHighlight>

            {/* SMS Notice */}
            <RN.Text style={[styles.componentSize, styles.text, styles.smsNoticeText]}>
              {"We'll send an SMS message to verify your phone number"}
            </RN.Text>

          <RN.View style={{flex: 3}} />
        </RN.View>

        <RN.Modal
          visible={this.state.isModalVisible}
          onRequestClose={this._setState({ isModalVisible: false })}
          transparent={false}
          animationType={'none'}
          >
          <RN.View style={[styles.flex, styles.container]}>
            <CountryListModal countryIndex={this.state.countryIndex} setParentState={this._setState} setCountry={this.setCountry} />
          </RN.View>
        </RN.Modal>

      </RN.View>
    )
  }
}


// --------------------------------------------------------------------


export default LoginScreen;
