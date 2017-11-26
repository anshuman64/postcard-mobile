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
      modalVisible: false,
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
      this.setState({ modalVisible: bool });
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
      this.setState({unformattedPhoneNumber: this.state.unformattedPhoneNumber.slice(0, -1)}, () => this.setFormattedPhoneNumber());
    } else {
      this.setState({unformattedPhoneNumber: value.match(/\d+/g).join('')}, () => this.setFormattedPhoneNumber());
    }
  }

  setFormattedPhoneNumber() {
    formatter.reset();
    this.setState({formattedPhoneNumber: formatter.input(this.state.unformattedPhoneNumber)});
  }

  onPhoneInputFocus(bool) {
    bool ? this.setState({ isPhoneInputFocused: styles.highlightBorder }) : this.setState({ isPhoneInputFocused: styles.unhighlightBorder });
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <Image
            style={styles.logo}
            source={Logo}
            resizeMode='contain'
          />
        </View>
        <View style={styles.bottomView}>
          <View style={{flex: 1}} />
            <TouchableWithoutFeedback
              onPressIn={() => this.onPressInCountryButton(true)}
              onPress={() => this.onPressCountryButton(true)}
            >
              <View style={this.state.isCountryButtonPressed}>
                <Text style={[styles.text, styles.countryText]}>
                  {this.state.selectedCountry}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          <View style={{height: 5 * scaleFactor}} />
            <TextInput
              style={[this.state.isPhoneInputFocused, styles.text]}
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
            <Text style={[styles.text, styles.nextButton]}
            >
              Next
            </Text>
          <View style={{flex: 3}} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa'
  },
  topView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  logo: {
    width: 70 * scaleFactor
  },
  bottomView: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  highlightBorder: {
    width: 100 * scaleFactor,
    height: 16 * scaleFactor,
    borderBottomColor: '#007aff',
    borderBottomWidth: 0.6 * scaleFactor
  },
  unhighlightBorder: {
    width: 100 * scaleFactor,
    height: 16 * scaleFactor,
    borderBottomColor: '#333333',
    borderBottomWidth: 0.3 * scaleFactor
  },
  countryText: {
    width: 100 * scaleFactor,
    height: 16 * scaleFactor,
    textAlignVertical: 'center'
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 7.4 * scaleFactor,
    textAlign: 'center',
    color: '#333333'
  },
  nextButton: {
    width: 100 * scaleFactor,
    height: 15 * scaleFactor,
    color: '#ffffff',
    textAlignVertical: 'center',
    borderRadius: 5,
    backgroundColor: '#007aff'
  }
});

export default LoginScreen;

// <Modal
//   animationType="fade"
//   transparent={true}
//   visible={this.state.modalVisible}
//   onRequestClose={() => {alert("Modal has been closed.")}}>
//   <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
//      <View style={{height: '90%', width: '90%', backgroundColor: 'white', flexDirection: 'column'}}>
//         <View style={{justifyContent: 'center', alignItems: 'center', height: 40}}>
//           <Text>Choose a country</Text>
//         </View>
//           <FlatList
//             data={countryCodes}
//             style={{paddingLeft: 20, paddingRight: 20}}
//             keyExtractor={(item, index) => index}
//             renderItem={({item}) =>
//               <TouchableHighlight onPress={() => this.makeSelection(item.country_name)} style={{height: 30}}>
//                 <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'grey'}}>
//                   <Text>
//                     {item.country_name}
//                   </Text>
//                   <Text>
//                     {item.dialing_code}
//                   </Text>
//                 </View>
//               </TouchableHighlight>} />
//
//         <TouchableWithoutFeedback onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
//           <View style={{justifyContent: 'center', alignItems: 'center', height: 40}}><Text>Cancel</Text></View>
//         </TouchableWithoutFeedback>
//       </View>
//   </View>
// </Modal>
