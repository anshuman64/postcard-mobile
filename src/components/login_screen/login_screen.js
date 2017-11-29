// Library Imports
import React                                                                                                        from 'react';
import { Platform, PixelRatio, View, Text, TouchableHighlight, Modal, Image, TouchableWithoutFeedback, TextInput }  from 'react-native';
import * as _                                                                                                       from 'lodash';
import { PhoneNumberUtil, AsYouTypeFormatter }                                                                      from 'google-libphonenumber';
import firebase                                                                                                     from 'react-native-firebase';

// Local Imports
import { styles, scaleFactor }   from './login_screen_styles.js';
import CountryListModal                     from './country_list_modal.js';
import { toConfirmCodeScreen }              from '../../actions/navigation_actions.js';
import Logo                                 from '../../resources/Logo_ExactFit_807x285.png';
import countryCodes                         from '../../resources/country_codes.js';


//--------------------------------------------------------------------//


class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      confirmationCode: '',
      countryIndex: 220, // hard-coded to United States
      isCountrySelectorPressed: false,
      isPhoneInputFocused: false,
      unformattedPhoneNumber: '',
      formattedPhoneNumber: '',
      isModalVisible: false,
      isNextButtonDisabled: true
    };

    this.unsubscribe = null;
    this.formatter = new AsYouTypeFormatter(countryCodes[this.state.countryIndex].country_code);
    this.phoneUtil = PhoneNumberUtil.getInstance();
  }

  static navigationOptions = {
    tabBarVisible: false,
    header: null
  };

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          confirmationCode: null,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  _setState = (state) => {
    return(
      () => (this.setState(state))
    )
  }

  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  _onPhoneInputChangeText(value) {
    let formatted;

    if (value.length >= this.state.formattedPhoneNumber.length) {
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

  setCountry = (index) => {
    return(
      () => {
        let tempFormatted = '';
        try {
          tempFormatted = this.state.formattedPhoneNumber.match(/[\d+]/g).join('');
          this.formatter = new AsYouTypeFormatter(countryCodes[index].country_code);
          _.forEach(tempFormatted, (char) => tempFormatted = this.formatter.inputDigit(char));
        } catch (e) {}
        this.setState({ countryIndex: index, formattedPhoneNumber: tempFormatted, isModalVisible: false }, () => this.checkNextButtonEnable());
      }
    )
  }

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

  _onNextButtonPress = () => {
    return(
      () => {
        let number = this.state.formattedPhoneNumber.match(/[\d+]/g).join('');
        if (number[0] != '+') {
          number = countryCodes[this.state.countryIndex].dialing_code + number;
        }

        this.setState({unformattedPhoneNumber: number})
        firebase.auth().signInWithPhoneNumber(number)
          .then((confirmationCode) => this.setState({ confirmationCode: confirmationCode }))
          .catch();
      }
    )
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={[styles.flex, styles.container]}>
        {/* Top section of view with Insiya logo */}
        <View style={[styles.flex, styles.topView]}>
          <Image
            style={styles.logo}
            source={Logo}
            resizeMode='contain'
          />
        </View>

        {/* Bottom section of view with CountrySelector, PhoneNumberInput, and NextButton */}
        <View style={[styles.bottomView]}>
          <View style={{flex: 1}} />

          {/* CountrySelector */}
          <TouchableWithoutFeedback
            onPress={this._setState({ isModalVisible: true})}
            onPressIn={this._setStateInAnimationFrame({ isCountrySelectorPressed: true})}
            onPressOut={this._setStateInAnimationFrame({ isCountrySelectorPressed: false})}
            >
            <View style={[styles.componentSize, styles.border, this.state.isCountrySelectorPressed && styles.borderHighlighted]}>
              <Text style={[styles.componentSize, styles.text]}>
                {countryCodes[this.state.countryIndex].country_name}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={{height: 5 * scaleFactor}} />

            {/* PhoneNumber */}
            <View style={[styles.componentSize, styles.phoneNumberView]}>
              {/* PhoneNumberCountryCode */}
              <Text style={[styles.phoneNumberCountryCode, styles.text, styles.border]}>
                {countryCodes[this.state.countryIndex].dialing_code}
              </Text>

              {/* PhoneNumberInput */}
              <TextInput
                style={[styles.phoneNumberInput, styles.text, styles.border, this.state.isPhoneInputFocused && styles.borderHighlighted]}
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

          <View style={{flex: 2}} />

            {/* NextButton */}
            <TouchableHighlight
              style={[styles.componentSize, styles.nextButtonBackgroundEnabled]}
              onPress={this._onNextButtonPress()}
              underlayColor='#0050a7'
              disabled={this.state.isNextButtonDisabled}
              >
              <Text style={[styles.componentSize, styles.text, styles.nextButtonTextDisabled, !this.state.isNextButtonDisabled && styles.nextButtonTextEnabled]}>
                Next
              </Text>
            </TouchableHighlight>

            {/* SMS Notice */}
            <Text style={[styles.componentSize, styles.text, styles.smsNoticeText]}>
              {"We'll send an SMS message to verify your phone number"}
            </Text>

          <View style={{flex: 3}} />
        </View>

        <Modal
          visible={this.state.isModalVisible}
          onRequestClose={this._setState({ isModalVisible: false })}
          transparent={false}
          >
          <View style={[styles.flex, styles.container]}>
            <CountryListModal countryIndex={this.state.countryIndex} setParentState={this._setState} setCountry={this.setCountry} />
          </View>
        </Modal>

      </View>
    )
  }
}


// --------------------------------------------------------------------


export default LoginScreen;
