// Library Imports
import React from 'react';
import { Platform, PixelRatio, StyleSheet, View, Text, FlatList, TouchableHighlight, Modal, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import { parse, format, asYouType } from 'libphonenumber-js';
import * as _ from 'lodash';

import { toCodeAuthScreen } from '../../actions/navigation_actions.js';
import Logo from '../../resources/Logo_ExactFit_807x285.png';
import countryCodes from '../../resources/country_codes.js';

//--------------------------------------------------------------------//

const scaleFactor = PixelRatio.get();
const formatter = new asYouType('US');


class CountryListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPressed: ''
    };
  }

  setStateInAnimationFrame(state) {
    requestAnimationFrame(() => {this.setState(state)})
  }

  _onPressOut = () => {
    this.setStateInAnimationFrame({isPressed: ''});
  }

  _onPressIn = () => {
    this.setStateInAnimationFrame({isPressed: styles.textHighlighted});
  }

  render() {
    console.log('Render CountryListItem')
    return(
      <TouchableWithoutFeedback
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}
        >
        <View style={[styles.countryListItems]}>
          <Text style={[styles.text, styles.countryListText, this.state.isPressed]}>
            {this.props.item.country_name}
          </Text>
          <Text style={[styles.text, styles.countryListText, this.state.isPressed]}>
            {this.props.item.dialing_code}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

class CountryListScrollView extends React.PureComponent {
  _renderItem(item, index) {
    return (
      <CountryListItem key={index} item={item} />
    )
  }

  render() {
    console.log('Render CountryListScrollView')
    return(
      <FlatList
        data={countryCodes}
        style={[styles.container]}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) => this._renderItem(item, index)}
        getItemLayout={(data, index) => ({offset: 17 * scaleFactor * index, length: 17 * scaleFactor, index})}
        removeClippedSubviews={false}
        initialNumToRender={75}
        maxToRenderPerBatch={100}
        windowSize={100}
        />
    )
  }
}

class CountryListModal extends React.PureComponent {

  render() {
    console.log('Render CountryListModal')
    return(
        <View style={[styles.flex, styles.modalContainer]}>

          {/* Choose Country Text */}
          <View style={[styles.flex, styles.chooseCountryText]}>
            <Text style={[styles.flex, styles.chooseCountryText, styles.text]}>
              Select Country
            </Text>
          </View>

          <CountryListScrollView />
          <CancelButton setModalInvisible={this.props.setModalInvisible} />
        </View>
    )
  }
}

class CancelButton extends React.PureComponent {
  _onPress = () => {
    this.props.setModalInvisible();
  }

  render () {
    console.log('Render CancelButton')
    return(
      <TouchableWithoutFeedback
        onPress={this._onPress}
      >
        <View style={[styles.flex, styles.chooseCountryText]}>
          <Text style={[styles.flex, styles.chooseCountryText, styles.text]}>
            Cancel
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

class CountrySelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPressed: styles.border
    };
  }

  setStateInAnimationFrame(state) {
    requestAnimationFrame(() => {this.setState(state)})
  }

  _onPress = () => {
    this.props.setModalVisible();
  }

  _onPressOut = () => {
    this.setStateInAnimationFrame({isPressed: styles.border});
  }

  _onPressIn = () => {
    this.setStateInAnimationFrame({isPressed: styles.borderHighlighted});
  }

  render() {
    console.log('Render CountrySelector')
    return (
      <TouchableWithoutFeedback
        onPress={this._onPress}
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}
        >
        <View style={[styles.componentSize, this.state.isPressed]}>
          <Text style={[styles.flex, styles.componentSize, styles.text]}>
            {this.props.selectedCountry}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

class PhoneNumberInput extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountry: 'United States',
      unformattedPhoneNumber: '',
      formattedPhoneNumber: '',
      isFocused: styles.border
    };
  }

  setStateInAnimationFrame(state) {
    requestAnimationFrame(() => {this.setState(state)})
  }

  _onFocus = () => {
    this.setStateInAnimationFrame({isFocused: styles.borderHighlighted})
  }

  _onEndEditing = () => {
    this.setStateInAnimationFrame({isFocused: styles.border})
  }

  _onChangeText(value) {
    if (value.length < this.state.formattedPhoneNumber.length) {
      this.setState({unformattedPhoneNumber: this.state.unformattedPhoneNumber.slice(0, -1).trim()}, () => this.setFormattedPhoneNumber());
    } else {
      this.setState({unformattedPhoneNumber: value.match(/\d+/g).join('')}, () => this.setFormattedPhoneNumber());
    }
  }

  setFormattedPhoneNumber() {
    formatter.reset();
    this.setState({formattedPhoneNumber: formatter.input(this.state.unformattedPhoneNumber)});
  }

  render() {
    console.log('Render PhoneNumberInput')
    return (
      <TextInput
        style={[styles.componentSize, this.state.isFocused, styles.text]}
        keyboardType='phone-pad'
        onChangeText={(value) => this._onChangeText(value)}
        value={this.state.formattedPhoneNumber}
        placeholder='Phone Number'
        placeholderTextColor='#bdbdbd'
        underlineColorAndroid={'transparent'}
        onFocus={this._onFocus}
        onEndEditing={this._onEndEditing}
      />
    )
  }
}

class NextButton extends React.PureComponent {
  render() {
    console.log('Render NextButton')
    return(
      <Text style={[styles.flex, styles.componentSize, styles.text, styles.nextButton]}>
        Next
      </Text>
    )
  }
}


class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isCancelButtonPressed: styles.text,
      selectedCountry: 'United States',
    };
  }

  static navigationOptions = {
    tabBarVisible: false,
    header: null
  };

  setParentState = (state) => {
    this.setState(state);
  }

  setModalVisible = () => {
    this.setState({ isModalVisible: true});
  }

  setModalInvisible = () => {
    this.setState({ isModalVisible: false});
  }

  setCountry = () => {
    this.setState({ selectedCountry: country });
    this.setState({ isModalVisible: false });

    for (var i=0; i < countryCodes.length; i++) {
        if (countryCodes[i].country_name === country) {
            formatter = new asYouType(countryCodes[i].country_code);
            this.setState({phoneNumber: formatter.input(this.state.phoneNumber)})
        }
    }
  }

  render() {
    console.log('Render LoginScreen')

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

        {/* Bottom section of view with CountrySelector, PhoneNumberInput, and NextButton */}
        <View style={[styles.flex, styles.container, styles.bottomView]}>
          <View style={{flex: 1}} />
            <CountrySelector selectedCountry={this.state.selectedCountry} setModalVisible={this.setModalVisible} />
          <View style={{height: 5 * scaleFactor}} />
            <PhoneNumberInput />
          <View style={{flex: 2}} />
            <NextButton />
          <View style={{flex: 3}} />
        </View>

        <Modal
          visible={this.state.isModalVisible}
          onRequestClose={this.setModalInvisible}
          transparent={false}
          >
          <View style={[styles.flex, styles.container]}>
            <CountryListModal setModalInvisible={this.setModalInvisible} />
          </View>
        </Modal>

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
    backgroundColor: '#fafafa'
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
    elevation: 50,
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
