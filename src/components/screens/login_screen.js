// Library Imports
import React from 'react';
import { Platform, PixelRatio, StyleSheet, View, Text, FlatList, TouchableHighlight, Modal, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import { parse, format, asYouType } from 'libphonenumber-js';

import { toCodeAuthScreen } from '../../actions/navigation_actions.js';
import Logo from '../../resources/Logo_ExactFit_807x285.png';
import countryCodes from '../../resources/country_codes.js';

//--------------------------------------------------------------------//

const scaleFactor = PixelRatio.get();
const formatter = new asYouType('US');

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      selectedCountry: 'United States',
      unformattedPhoneNumber: '',
      formattedPhoneNumber: '',
      isPhoneInputFocused: styles.unhighlightBorder,
      isCountryButtonPressed: styles.unhighlightBorder
    };
  }

  static navigationOptions = {
    tabBarVisible: false,
    header: null
  };

  onPressInCountryButton(bool) {
    bool ? this.setState({ isCountryButtonPressed: styles.highlightBorder })  : this.setState({ isCountryButtonPressed: styles.unhighlightBorder });
  }

  onPressCountryButton(bool) {
      this.setState({ isModalVisible: bool });
  }

  makeSelection(country) {
    this.setState({ selectedCountry: country });
    this.setModalVisible(false);

    for (var i=0; i < countryCodes.length; i++) {
        if (countryCodes[i].country_name === country) {
            formatter = new asYouType(countryCodes[i].country_code);
            this.setState({phoneNumber: formatter.input(this.state.phoneNumber)})
        }
    }

  }

  onChangePhoneInput(value) {
    if (value.length < this.state.formattedPhoneNumber.length) {
      this.setState({unformattedPhoneNumber: this.state.unformattedPhoneNumber.slice(0, -1).trim()}, () => this.setFormattedPhoneNumber());
    } else {
      this.setState({unformattedPhoneNumber: value.match(/./g).join('')}, () => this.setFormattedPhoneNumber());
    }
  }

  setFormattedPhoneNumber() {
    formatter.reset();
    this.setState({formattedPhoneNumber: formatter.input(this.state.unformattedPhoneNumber)});
  }

  onPhoneInputFocus(bool) {
    bool ? this.setState({ isPhoneInputFocused: styles.highlightBorder }) : this.setState({ isPhoneInputFocused: styles.unhighlightBorder });
  }

  renderCountryList(item) {
      return (
        <TouchableHighlight
          onPress={() => this.makeSelection(item.country_name)}
          style={{height: 30}}
        >
          <View style={[styles.countryListItem]}>
            <Text style={[styles.flex, styles.text]}>
              {item.country_name}
            </Text>
            <Text style={[styles.flex, styles.text]}>
              {item.dialing_code}
            </Text>
          </View>
        </TouchableHighlight>
      )
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={[styles.flex, styles.container]}>

        {/* Top section of view with Insiya logo */}
        <View style={[styles.flex, styles.container, styles.topView]}>
          <Image
            style={styles.logo}
            source={Logo}
            resizeMode='contain'
          />
        </View>

        {/* Bottom section of view with CountryPicker, PhoneNumberInput, and NextButton */}
        <View style={[styles.flex, styles.container, styles.bottomView]}>
          <View style={{flex: 1}} />

            {/* CountryPicker */}
            <TouchableWithoutFeedback
              onPressIn={() => this.onPressInCountryButton(true)}
              onPress={() => this.onPressCountryButton(true)}
            >
              <View style={[styles.componentSize, this.state.isCountryButtonPressed]}>
                <Text style={[styles.flex, styles.componentSize, styles.text]}>
                  {this.state.selectedCountry}
                </Text>
              </View>
            </TouchableWithoutFeedback>

          <View style={{height: 5 * scaleFactor}} />

            {/* PhoneNumberInput */}
            <TextInput
              style={[styles.componentSize, this.state.isPhoneInputFocused, styles.text]}
              keyboardType='phone-pad'
              onChangeText={(value) => this.onChangePhoneInput(value)}
              value={this.state.formattedPhoneNumber}
              placeholder='Phone Number'
              placeholderTextColor='#bdbdbd'
              underlineColorAndroid={'transparent'}
              onFocus={() => this.onPhoneInputFocus(true)}
              onEndEditing={() => this.onPhoneInputFocus(false)}
            />

          <View style={{flex: 2}} />

            {/* NextButton */}
            <Text style={[styles.flex, styles.componentSize, styles.text, styles.nextButton]}>
              Next
            </Text>
          <View style={{flex: 3}} />
        </View>

        {/* Modal dialog with CountryList*/}
        <View style={[styles.flex, styles.modalContainer]}>
          <View style={[styles.flex, styles.chooseCountryText]}>
            <Text style={[styles.flex, styles.chooseCountryText, styles.text]}>
              Choose a country
            </Text>
          </View>
          <FlatList
            data={countryCodes}
            style={{paddingLeft: 20, paddingRight: 20}}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => this.renderCountryList(item)}
          />
        </View>

      </View>
    )
  }
}

//
// StyleSheet
// ---------------------------------------------------

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa',
    zIndex: 0
  },
  topView: {
    flex: 1,
  },
  logo: {
    width: 70 * scaleFactor
  },
  bottomView: {
    flex: 2,
    justifyContent: 'flex-start'
  },
  componentSize: {
      width: 100 * scaleFactor,
      height: 16 * scaleFactor
  },
  highlightBorder: {
    borderBottomColor: '#007aff',
    borderBottomWidth: 0.6 * scaleFactor
  },
  unhighlightBorder: {
    borderBottomColor: '#333333',
    borderBottomWidth: 0.3 * scaleFactor,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 7.4 * scaleFactor,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#333333'
  },
  nextButton: {
    color: '#ffffff',
    textAlignVertical: 'center',
    borderRadius: 5,
    backgroundColor: '#007aff',

  },
  modalContainer: {
    width: '90%',
    height: '90%',
    zIndex: 1,
    elevation: 50,
    position: 'absolute',
    backgroundColor: '#fafafa',
  },
  chooseCountryText: {
    height: 40 * scaleFactor,
  },
  countryListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  }

});

// --------------------------------------------------------------------

export default LoginScreen;



//  <View style={{height: '90%', width: '90%', backgroundColor: 'white', flexDirection: 'column'}}>
//     <View style={{justifyContent: 'center', alignItems: 'center', height: 40}}>
//       <Text>Choose a country</Text>
//     </View>
//       <FlatList
//         data={countryCodes}
//         style={{paddingLeft: 20, paddingRight: 20}}
//         keyExtractor={(item, index) => index}
//         renderItem={({item}) =>
//           <TouchableHighlight onPress={() => this.makeSelection(item.country_name)} style={{height: 30}}>
//             <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'grey'}}>
//               <Text>
//                 {item.country_name}
//               </Text>
//               <Text>
//                 {item.dialing_code}
//               </Text>
//             </View>
//           </TouchableHighlight>} />
//
//     <TouchableWithoutFeedback onPress={() => { this.setModalVisible(!this.state.isModalVisible) }}>
//       <View style={{justifyContent: 'center', alignItems: 'center', height: 40}}><Text>Cancel</Text></View>
//     </TouchableWithoutFeedback>
//   </View>
