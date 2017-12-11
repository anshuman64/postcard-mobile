// Library Imports
import React                                                                                                               from 'react';
import { Keyboard, View, Text, TouchableHighlight, Modal, Image, TouchableWithoutFeedback, TextInput, ActivityIndicator }  from 'react-native';
import * as _                                                                                                              from 'lodash';
import { PhoneNumberUtil, AsYouTypeFormatter }                                                                             from 'google-libphonenumber';
import firebase                                                                                                            from 'react-native-firebase';
import Icon                                                                                                                from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles }               from './login_screen_styles.js';
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

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderLogo() {
    return (
      <View style={ styles.topView }>
        <Image
          style={ styles.logo }
          source={require('../../resources/images/login_screen_logo/Logo_ExactFit_807x285.png')}
          resizeMode='contain'
        />
      </View>
    )
  }

  _renderCountrySelector() {
    return (
      <TouchableWithoutFeedback
        onPress={this._setState({ isModalVisible: true})}
        onPressIn={this._setStateInAnimationFrame({ isCountrySelectorPressed: true})}
        onPressOut={this._setStateInAnimationFrame({ isCountrySelectorPressed: false})}
        >
        <View style={[styles.countrySelectorView, this.state.isCountrySelectorPressed && styles.borderHighlighted]}>
          <Text style={ styles.countrySelectorText }>
            {countryCodes[this.state.countryIndex].country_name}
          </Text>
          <Icon name='md-arrow-dropdown' style={ styles.dropdownIcon } />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderPhoneNumberInput() {
    return (
      <View style={ styles.phoneNumberView }>
        {/* PhoneNumberCountryCode */}
        <Text style={ styles.countryCodeText }>
          {countryCodes[this.state.countryIndex].dialing_code}
        </Text>

        {/* PhoneNumberInput */}
        <TextInput
          style={[styles.phoneNumberInput, this.state.isPhoneInputFocused && styles.borderHighlighted, this.state.isPhoneNumberInvalid && styles.borderRed]}
          keyboardType='phone-pad'
          onChangeText={(value) => this._onPhoneInputChangeText(value)}
          value={this.state.formattedPhoneNumber}
          placeholder='Phone Number'
          placeholderTextColor='#bdbdbd'
          underlineColorAndroid={'transparent'}
          onFocus={this._setStateInAnimationFrame({ isPhoneInputFocused: true})}
          onEndEditing={this._setStateInAnimationFrame({ isPhoneInputFocused: false})}
        />
      </View>
    )
  }

  _renderInvalidNumberText() {
    if (this.state.isPhoneNumberInvalid) {
      return (
        <View style={ styles.phoneNumberView }>
          <View style={{width: '25%'}} />
          <Text style={[styles.invalidNumberText]}>
            Invalid Number
          </Text>
        </View>
      )
    }
  }

  _renderNextButton() {
    return (
      <TouchableHighlight
        style={ styles.nextButtonBackground }
        onPress={() => this._onNextButtonPress()}
        underlayColor='#0050a7'
        disabled={this.state.isNextButtonDisabled && this.state.isLoading}
        >
        { this.state.isLoading ?
          <ActivityIndicator size='small' color='#bdbdbd' /> :
          <Text style={[styles.nextButtonText, this.state.isNextButtonDisabled && styles.nextButtonTextDisabled]}>
            Next
          </Text>
        }
      </TouchableHighlight>
    )
  }

  _renderSMSNoticeText() {
    return (
      <Text style={ styles.smsNoticeText }>
        {"We'll send an SMS message to verify your phone number"}
      </Text>
    )
  }

  _renderModal() {
    return (
      <Modal
        visible={this.state.isModalVisible}
        onRequestClose={this._setState({ isModalVisible: false })}
        transparent={false}
        animationType={'none'}
        >
        <View style={ styles.container }>
          <CountryListModal countryIndex={this.state.countryIndex} setParentState={this._setState} setCountry={this.setCountry} />
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <View style={ styles.container }>
        {this._renderLogo()}
        <View style={ styles.bottomView }>
          <View style={{flex: 1}} />
            {this._renderCountrySelector()}
          <View style={{height: 5}} />
            {this._renderPhoneNumberInput()}
            {this._renderInvalidNumberText()}
          <View style={{flex: 2}} />
            {this._renderNextButton()}
            {this._renderSMSNoticeText()}
          <View style={{flex: 3}} />
        </View>
      </View>
    )
  }
}


// --------------------------------------------------------------------


export default LoginScreen;
