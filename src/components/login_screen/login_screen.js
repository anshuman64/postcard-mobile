// Library Imports
import React                                    from 'react';
import RN                                       from 'react-native';
import * as _                                   from 'lodash';
import { PhoneNumberUtil, AsYouTypeFormatter }  from 'google-libphonenumber';
import firebase                                 from 'react-native-firebase';
import Icon                                     from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles }                                      from './login_screen_styles.js';
import CountryListModal                                from './country_list_modal.js';
import { COUNTRY_CODES }                               from '../../utilities/country_utility.js';
import { setStateCallback, setStateInAnimationFrame }  from '../../utilities/function_utility.js';
import { COLORS }                                      from '../../utilities/style_utility.js';
import { toConfirmCodeScreen }     from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


class LoginScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      countryIndex:             220, // hard-coded to United States
      isCountrySelectorPressed: false,
      isPhoneInputFocused:      false,
      formattedPhoneNumber:     '',
      isModalVisible:           false,
      isNextButtonDisabled:     true,
      isLoading:                false,
      isPhoneNumberInvalid:     false,
    };

    this.unsubscribe = null;
    this.formatter = new AsYouTypeFormatter(COUNTRY_CODES[this.state.countryIndex].country_code); // libphonenumber object that formats phone numbers by country as each character is typed
    this.phoneUtil = PhoneNumberUtil.getInstance(); // libphonenumber object used to parse phone numbers
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Callback function for setting country selector and updating phone number formatting
  setCountry = (index) => {
    return (
      () => {
        let tempFormatted = '';
        // Create new libphonenumber formatter for new country
        this.formatter = new AsYouTypeFormatter(COUNTRY_CODES[index].country_code);
        // Try extracting raw number input from phone number and readding each character to formatter; escape if nothing to format
        try {
          tempFormatted = this.state.formattedPhoneNumber.match(/[\d+]/g).join('');
          _.forEach(tempFormatted, (char) => tempFormatted = this.formatter.inputDigit(char));
        } catch (e) {}

        this.setState({ countryIndex: index, formattedPhoneNumber: tempFormatted, isModalVisible: false }, () => this._checkNextButtonEnable());
      }
    )
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  // Enables Next button only when libphonenumber believes phone number is "possible"
  // TODO: figure out better logic for this
  _checkNextButtonEnable() {
    let phoneUtilNumber;

    try {
      phoneUtilNumber = this.phoneUtil.parse(this.state.formattedPhoneNumber, COUNTRY_CODES[this.state.countryIndex].country_code);

      if (this.phoneUtil.isPossibleNumber(phoneUtilNumber)) {
        this.setState({isNextButtonDisabled: false});
      } else {
        this.setState({isNextButtonDisabled: true});
      }
    } catch (e) {}
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

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

    this.setState({ formattedPhoneNumber: formatted }, () => this._checkNextButtonEnable());
  }

  // Callback function that extracts raw numbers from phone number, adds country code, and sends to Firebase API
  _onNextButtonPress() {
    let number = this.state.formattedPhoneNumber.match(/[\d+]/g).join('');
    if (number[0] != '+') {
      number = COUNTRY_CODES[this.state.countryIndex].dialing_code + number;
    }

    // Debug test
    // if (number === '+14088888888') {
    //   this.setState({isPhoneNumberInvalid: true});
    // } else {
    //   this.setState({isLoading: true});
    //   this.props.debugGetConfirmationCode(number)
    //     .then(this.setState({isLoading: false, isPhoneNumberInvalid: false}, () => this.props.navigation.dispatch(toConfirmCodeScreen(this.props.currentScreen))))
    // }

    // Real Firebase API
    this.setState({isLoading: true}, () => {
    this.props.getConfirmationCode(number) //  TODO: try to setState after dispatch
     .then(() => this.setState({ isLoading: false, isPhoneNumberInvalid: false }, () => this.props.navigation.dispatch(toConfirmCodeScreen(this.props.currentScreen))))
     .catch(() => this.setState({ isLoading: false, isPhoneNumberInvalid: true }))
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

  _renderCountrySelector() {
    return (
      <RN.TouchableWithoutFeedback
        onPress={setStateCallback(this, { isModalVisible: true})}
        onPressIn={setStateInAnimationFrame(this, { isCountrySelectorPressed: true})}
        onPressOut={setStateInAnimationFrame(this, { isCountrySelectorPressed: false})}
        >
        <RN.View style={[styles.countrySelectorView, this.state.isCountrySelectorPressed && styles.borderHighlighted]}>
          <RN.Text style={ styles.countrySelectorText }>
            {COUNTRY_CODES[this.state.countryIndex].country_name}
          </RN.Text>
          <Icon name='md-arrow-dropdown' style={ styles.dropdownIcon } />
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderPhoneNumberInput() {
    return (
      <RN.View style={ styles.phoneNumberView }>
        {/* PhoneNumberCountryCode */}
        <RN.Text style={ styles.countryCodeText }>
          {COUNTRY_CODES[this.state.countryIndex].dialing_code}
        </RN.Text>

        {/* PhoneNumberInput */}
        <RN.TextInput
          style={[styles.phoneNumberInput, this.state.isPhoneInputFocused && styles.borderHighlighted, this.state.isPhoneNumberInvalid && styles.borderRed]}
          keyboardType='phone-pad'
          onChangeText={(value) => this._onPhoneInputChangeText(value)}
          value={this.state.formattedPhoneNumber}
          placeholder='Phone Number'
          placeholderTextColor={COLORS.grey400}
          underlineColorAndroid={'transparent'}
          onFocus={setStateInAnimationFrame(this, { isPhoneInputFocused: true})}
          onEndEditing={setStateInAnimationFrame(this, { isPhoneInputFocused: false})}
        />
      </RN.View>
    )
  }

  _renderInvalidNumberText() {
    if (this.state.isPhoneNumberInvalid) {
      return (
        <RN.View style={ styles.phoneNumberView }>
          <RN.View style={{width: '25%'}} />
          <RN.Text style={[styles.invalidNumberText]}>
            Invalid Number
          </RN.Text>
        </RN.View>
      )
    }
  }

  _renderNextButton() {
    return (
      <RN.TouchableHighlight
        style={ styles.nextButtonBackground }
        onPress={() => this._onNextButtonPress()}
        underlayColor='#0050a7'
        disabled={this.state.isNextButtonDisabled && !this.state.isLoading}
        >
        { this.state.isLoading ?
          <RN.ActivityIndicator size='small' color={COLORS.grey400} /> :
          <RN.Text style={[styles.nextButtonText, this.state.isNextButtonDisabled && styles.nextButtonTextDisabled]}>
            Next
          </RN.Text>
        }
      </RN.TouchableHighlight>
    )
  }

  _renderSMSNoticeText() {
    return (
      <RN.Text style={ styles.smsNoticeText }>
        {"We'll send an SMS message to verify your phone number"}
      </RN.Text>
    )
  }

  _renderModal() {
    return (
      <RN.Modal
        visible={this.state.isModalVisible}
        onRequestClose={setStateCallback(this, { isModalVisible: false })}
        transparent={false}
        animationType={'none'}
        >
        <RN.View style={ styles.container }>
          <CountryListModal countryIndex={this.state.countryIndex} setParentState={setStateCallback} setCountry={this.setCountry} />
        </RN.View>
      </RN.Modal>
    )
  }

  render() {
    return (
      <RN.View style={ styles.container }>
        {this._renderLogo()}
        <RN.View style={ styles.bottomView }>
          <RN.View style={{flex: 1}} />
            {this._renderCountrySelector()}
          <RN.View style={{height: 5}} />
            {this._renderPhoneNumberInput()}
            {this._renderInvalidNumberText()}
          <RN.View style={{flex: 2}} />
            {this._renderNextButton()}
            {this._renderSMSNoticeText()}
          <RN.View style={{flex: 3}} />
            {this._renderModal()}
        </RN.View>
      </RN.View>
    )
  }
}


// --------------------------------------------------------------------


export default LoginScreen;
