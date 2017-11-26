// Library Imports
import React from 'react';
import { Platform, PixelRatio, StyleSheet, View, Text, ScrollView, TouchableHighlight, Modal, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import { parse, format, asYouType } from 'libphonenumber-js';
import * as _ from 'lodash';

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
      isPhoneInputFocused: styles.border,
      isCountryButtonPressed: styles.border,
      isCancelButtonPressed: styles.text,
    };
  }

  static navigationOptions = {
    tabBarVisible: false,
    header: null
  };

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

  selectCountry(country) {
    this.setState({ selectedCountry: country });
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

  renderCountryList(data) {
    console.warn('hello')
    return (data.map((item, index) => { return(
      <View key={index} style={[styles.countryListItems]}>
        <Text
          style={[styles.text, styles.countryListText]}
        >
          {item.country_name}
        </Text>
        <Text style={[styles.text, styles.countryListText]}>
          {item.dialing_code}
        </Text>
      </View>
    )}))
  }

  renderCountryListModal() {
    return(
      <View style={[styles.flex, styles.modalContainer]}>

        {/* Choose Country Text */}
        <View style={[styles.flex, styles.chooseCountryText]}>
          <Text style={[styles.flex, styles.chooseCountryText, styles.text]}>
            Select Country
          </Text>
        </View>

        {/* Country List */}
        <ScrollView style={[styles.container]}>
          {this.renderCountryList(countryCodes)}
        </ScrollView>
asdfas
        {/* Cancel Button */}
        <TouchableWithoutFeedback
          onPressIn={() => this.setState({isCancelButtonPressed: styles.textHighlighted})}
          onPress={() => this.setState({isCancelButtonPressed: ''})}
        >
          <View style={[styles.flex, styles.chooseCountryText]}>
            <Text style={[styles.flex, styles.chooseCountryText, styles.text, this.state.isCancelButtonPressed]}>
              Cancel
            </Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    )
  }

  // Helper function to improve performance of setState in onPress: https://facebook.github.io/react-native/docs/performance.html
  setStateInAnimationFrame(state) {
    requestAnimationFrame(() => {this.setState(state)})
  }

  render() {
    const {navigation} = this.props;

      console.warn('renderme')
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
              onPressIn={() => this.setStateInAnimationFrame({isCountryButtonPressed: styles.borderHighlighted})}
              onPress={() => {
                this.renderCountryListModal();
              }}
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
              onFocus={() => this.setStateInAnimationFrame({isPhoneInputFocused: styles.borderHighlighted})}
              onEndEditing={() => this.setStateInAnimationFrame({isPhoneInputFocused: styles.border})}
            />

          <View style={{flex: 2}} />

            {/* NextButton */}
            <Text style={[styles.flex, styles.componentSize, styles.text, styles.nextButton]}>
              Next
            </Text>
          <View style={{flex: 3}} />
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
  borderHighlighted: {
    borderBottomColor: '#007aff',
    borderBottomWidth: 0.6 * scaleFactor
  },
  border: {
    borderBottomColor: '#212121',
    borderBottomWidth: 0.3 * scaleFactor,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 7.4 * scaleFactor,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121'
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
    width: '100%',
    height: 20 * scaleFactor,
    elevation: 1,
    backgroundColor: '#fafafa'
  },
  countryListItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 17 * scaleFactor,
    marginLeft: 10 * scaleFactor,
    marginRight: 10 * scaleFactor,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  countryListText: {
    fontSize: 6 * scaleFactor,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#212121'
  },
  textHighlighted: {
    color: '#007aff'
  }

});

// --------------------------------------------------------------------

export default LoginScreen;


  // this.setStateInAnimationFrame({isCountryButtonPressed: styles.border});

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

// countryCodes.map((item, index) => {
//     return (<Text style={{backgroundColor: 'blue'}} key={index}>{item.country_name}</Text> )
// })
