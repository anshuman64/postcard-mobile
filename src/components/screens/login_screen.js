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
      isPhoneInputFocused: styles.phoneNumberInputUnfocused
    };
  }

  static navigationOptions = {
    tabBarVisible: false,
    header: null
  };

  setModalVisible(bool) {
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
          <TouchableHighlight
            style={styles.countryPickerButton}
            onPress={() => this.setModalVisible(true)}
            underlayColor='grey'
          >
            <Text style={styles.text}>
              {this.state.selectedCountry}
            </Text>
          </TouchableHighlight>
          <TextInput
            style={[this.state.isPhoneInputFocused, styles.text]}
            keyboardType='phone-pad'
            onChangeText={(value) => this.onChangePhoneInput(value)}
            value={this.state.formattedPhoneNumber}
            placeholder='Phone Number'
            placeholderTextColor='#bdbdbd'
            underlineColorAndroid={'transparent'}
            onFocus={() => this.setState({ isPhoneInputFocused: styles.phoneNumberInputFocused })}
            onEndEditing={() => this.setState({ isPhoneInputFocused: styles.phoneNumberInputUnfocused })}
          />
          <TouchableHighlight
            style={{justifyContent: 'center', height: 40}}
            onPress={() => this.props.navigation.navigate('ConfirmCode')}
            underlayColor='grey'
          >
            <Text style={[styles.button, styles.text]}>Next</Text>
          </TouchableHighlight>
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
  countryPickerButton: {
    justifyContent: 'flex-end',
    height: 60,
    width: '80%',
    marginTop: 60,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  phoneNumberInputFocused: {
    width: '80%',
    height: 16 * scaleFactor,
    borderBottomColor: '#007aff',
    borderBottomWidth: 2
  },
  phoneNumberInputUnfocused: {
    width: '80%',
    height: 16 * scaleFactor,
    borderBottomColor: '#333333',
    borderBottomWidth: 1
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 7.2 * scaleFactor
  },
  button: {
    width: 7.2 * scaleFactor,
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
