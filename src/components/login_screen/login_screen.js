// Library Imports
import React                                    from 'react';
import RN                                       from 'react-native';
import * as _                                   from 'lodash';
import { PhoneNumberUtil, AsYouTypeFormatter }  from 'google-libphonenumber';
import firebase                                 from 'react-native-firebase';
import Icon                                     from 'react-native-vector-icons/Ionicons';
import * as Animatable                          from 'react-native-animatable';

// Local Imports
import { styles }              from './login_screen_styles.js';
import * as Animations         from './login_screen_animations.js';
import CountryListModal        from './country_list_modal.js';
import { COUNTRY_CODES }       from '../../utilities/country_utility.js';
import { setStateCallback }    from '../../utilities/function_utility.js';
import { COLORS }              from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


class LoginScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      isLogoFading:             true,
      countryIndex:             220, // hard-coded to United States
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

  // Callback function used for Cancel button in CountryListModal
  setParentState = (state) => {
    return () => (this.setState(state));
  }

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
    //     .then(this.setState({isLoading: false, isPhoneNumberInvalid: false}, () => this.props.navigateTo('ConfirmCodeScreen')))
    // }

    // Real Firebase API
    this.setState({isLoading: true}, () => {
    this.props.getConfirmationCode(number) //  TODO: try to setState after dispatch
     .then(() => this.setState({ isLoading: false, isPhoneNumberInvalid: false }, () => this.props.navigateTo('ConfirmCodeScreen')))
     .catch(() => this.setState({ isLoading: false, isPhoneNumberInvalid: true }))
    })
  }

  //--------------------------------------------------------------------//
  // Render Animation Methods
  //--------------------------------------------------------------------//

  _renderIconAnimation() {
    if (this.state.isLogoFading) {
      return (
        <Animatable.Image
          style={styles.icon}
          source={require('../../assets/images/icon/icon.png')}
          resizeMode='contain'
          animation={Animations.fadeInIcon}
          duration={20}
          delay={10}
          />
      )
    } else {
      return (
        <Animatable.Image
          style={styles.icon}
          source={require('../../assets/images/icon/icon.png')}
          resizeMode='contain'
          animation={Animations.translateIcon}
          duration={20}
          />
      )
    }
  }

  _renderLogoAnimation() {
    if (this.state.isLogoFading) {
      return (
        <Animatable.Text
          style={styles.logo}
          source={require('../../assets/images/logo/logo.png')}
          resizeMode='contain'
          animation={'fadeIn'}
          duration={18}
          delay={30}
          onAnimationEnd={setStateCallback(this, { isLogoFading: false })}
          >
          Insiya
        </Animatable.Text>
      )
    } else {
      return (
        <Animatable.Text
          style={styles.logo}
          source={require('../../assets/images/logo/logo.png')}
          resizeMode='contain'
          animation={Animations.translateLogo}
          duration={20}
          >
          Insiya
        </Animatable.Text>
      )
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderCountrySelector() {
    return (
      <RN.TouchableWithoutFeedback
        onPress={setStateCallback(this, { isModalVisible: true})}
        onPressIn={() => {
          this.countrySelectorView.setNativeProps({style: styles.borderHighlighted})
          this.countrySelectorText.setNativeProps({style: styles.textHighlighted})
          this.dropdownIcon.setNativeProps({style: styles.textHighlighted})
        }}
        onPressOut={() => {
          this.countrySelectorView.setNativeProps({style: styles.countrySelectorView})
          this.countrySelectorText.setNativeProps({style: styles.countrySelectorText})
          this.dropdownIcon.setNativeProps({style: styles.dropdownIcon})
        }}
        >
        <RN.View ref={(ref) => this.countrySelectorView = ref} style={styles.countrySelectorView}>
          <RN.Text ref={(ref) => this.countrySelectorText = ref} style={styles.countrySelectorText}>
            {COUNTRY_CODES[this.state.countryIndex].country_name}
          </RN.Text>
          <Icon name='md-arrow-dropdown' ref={(ref) => this.dropdownIcon = ref} style={styles.dropdownIcon} />
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderPhoneNumberInput() {
    return (
      <RN.View style={ styles.phoneNumberView }>
        {/* PhoneNumberCountryCode */}
        <RN.View style={ styles.countryCodeTextView }>
          <RN.Text style={ styles.countryCodeText }>
            {COUNTRY_CODES[this.state.countryIndex].dialing_code}
          </RN.Text>
        </RN.View>

        {/* PhoneNumberInput */}
          <RN.TextInput
            ref={(ref) => this.phoneInput = ref}
            style={[styles.phoneNumberInput, this.state.isPhoneNumberInvalid && styles.borderRed]}
            keyboardType='phone-pad'
            onChangeText={(value) => this._onPhoneInputChangeText(value)}
            value={this.state.formattedPhoneNumber}
            placeholder='Phone Number'
            placeholderTextColor={COLORS.grey4}
            underlineColorAndroid={'transparent'}
            onFocus={() => !this.state.isPhoneNumberInvalid && this.phoneInput.setNativeProps({style: [styles.borderHighlighted, styles.textHighlighted]})}
            onEndEditing={() => !this.state.isPhoneNumberInvalid && this.phoneInput.setNativeProps({style: styles.phoneNumberInput})}
            />
      </RN.View>
    )
  }

  _renderInvalidNumberText() {
    return (
      <RN.View style={ styles.phoneNumberView }>
        <RN.Text style={[styles.invalidNumberText, !this.state.isPhoneNumberInvalid && styles.invalidNumberTextTransparent]}>
          Invalid Number
        </RN.Text>
      </RN.View>
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableOpacity
        style={[styles.nextButtonBackground, this.state.isNextButtonDisabled && styles.nextButtonBackgroundDisabled]}
        onPress={() => this._onNextButtonPress()}
        disabled={this.state.isNextButtonDisabled && !this.state.isLoading}
        >
        { this.state.isLoading ?
          <RN.ActivityIndicator size='small' color={COLORS.grey4} /> :
          <RN.Text style={[styles.nextButtonText, this.state.isNextButtonDisabled && styles.nextButtonTextDisabled]}>
            Next
          </RN.Text>
        }
      </RN.TouchableOpacity>
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
          <CountryListModal countryIndex={this.state.countryIndex} setParentState={this.setParentState} setCountry={this.setCountry} />
        </RN.View>
      </RN.Modal>
    )
  }

  _renderLoginScreen() {
    if (!this.state.isLogoFading) {
      return (
        <Animatable.View
          animation={'fadeIn'}
          duration={20}
          delay={6}
          >
          {this._renderCountrySelector()}
          {this._renderPhoneNumberInput()}
          {this._renderInvalidNumberText()}
          {this._renderNextButton()}
          {this._renderSMSNoticeText()}
          {this._renderModal()}
        </Animatable.View>
      )
    }
  }

  render() {
    return (
      <RN.View style={ styles.container }>
        {this._renderIconAnimation()}
        {this._renderLogoAnimation()}
        {this._renderLoginScreen()}
      </RN.View>
    )
  }
}

// --------------------------------------------------------------------


export default LoginScreen;
