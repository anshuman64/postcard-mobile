// Library Imports
import React from 'react';
import { Platform, PixelRatio, StyleSheet, View, Text, ListView, TouchableHighlight, Modal, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import * as _ from 'lodash';
import { PhoneNumberUtil, AsYouTypeFormatter } from 'google-libphonenumber';

import { toCodeAuthScreen } from '../../actions/navigation_actions.js';
import Logo from '../../resources/Logo_ExactFit_807x285.png';
import countryCodes from '../../resources/country_codes.js';

//--------------------------------------------------------------------//

const scaleFactor = PixelRatio.get();


class CountryListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      textStyle: ''
    };
  }

  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  render() {
    console.log('Render CountryListItem')
    return(
      <TouchableWithoutFeedback
        onPressIn={this._setStateInAnimationFrame({textStyle: styles.textHighlighted})}
        onPressOut={this._setStateInAnimationFrame({textStyle: ''})}
        onPress={this.props.setCountry(this.props.countryIndex)}
        >
        <View style={[styles.countryListItems]}>
          <Text style={[styles.text, styles.countryListText, this.state.textStyle]}>
            {this.props.item.country_name}
          </Text>
          <Text style={[styles.text, styles.countryListText, this.state.textStyle]}>
            {this.props.item.dialing_code}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

class CountryListModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(countryCodes),
      cancelTextStyle: ''
    };
  }

  _onListViewContentSizeChange = () => {
    this.listView.scrollTo({x: 0, y: this.props.countryIndex * 17 * scaleFactor - 2, animated: true})
  }

  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  _renderItem = () => {
    return (
      (rowData, sectionID, rowID) => ( <CountryListItem item={rowData} countryIndex={rowID} setCountry={this.props.setCountry} /> )
    )
  }

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

          {/* CountryListView */}
          <ListView
            ref={(ref) => this.listView = ref}
            dataSource={this.state.dataSource}
            style={[styles.container]}
            renderRow={this._renderItem()}
            initialListSize={countryCodes.length}
            onContentSizeChange={this._onListViewContentSizeChange}
          />

          {/* CancelButton */}
          <TouchableWithoutFeedback
            onPressIn={this._setStateInAnimationFrame({ cancelTextStyle: styles.textHighlighted})}
            onPressOut={this._setStateInAnimationFrame({ cancelTextStyle: ''})}
            onPress={this.props.setParentState({ isModalVisible: false })}
          >
            <View style={[styles.flex, styles.chooseCountryText]}>
              <Text style={[styles.flex, styles.chooseCountryText, styles.text, this.state.cancelTextStyle]}>
                Cancel
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
    )
  }
}

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      countryIndex: 220, // hard-coded to United STates
      countrySelectorBorderStyle: styles.border,
      phoneInputBorderStyle: styles.border,
      unformattedPhoneNumber: '',
      formattedPhoneNumber: '',
      isModalVisible: false,
      isNextButtonDisabled: false
    };

    this.formatter = new AsYouTypeFormatter(countryCodes[this.state.countryIndex].country_code);
    this.phoneUtil = PhoneNumberUtil.getInstance();
  }

  static navigationOptions = {
    tabBarVisible: false,
    header: null
  };

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

  _onChangeText(value) {
    let unformatted, formatted, phoneUtilNumber;

    if (value.length >= this.state.formattedPhoneNumber.length) {
      unformatted = this.state.unformattedPhoneNumber + value[value.length - 1];
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

      try {
        // Convert formatted number to unformatted number with last char deleted
        unformatted = formatted.match(/\d+/g).join('');
      } catch (e) {
        // If null, set unformatted to ''
        unformatted = '';
      }
    }

    this.setState({unformattedPhoneNumber: unformatted, formattedPhoneNumber: formatted});

    try {
      phoneUtilNumber = this.phoneUtil.parse(formatted, countryCodes[this.state.countryIndex].country_code);

      if (this.phoneUtil.isPossibleNumber(phoneUtilNumber)) {
        this.setState({isNextButtonDisabled: false});
      } else {
        this.setState({isNextButtonDisabled: true});
      }
    } catch (e) {}
  }

  setCountry = (index) => {
    return(
      () => {
        let tempFormatted = this.state.unformattedPhoneNumber;
        this.formatter = new AsYouTypeFormatter(countryCodes[index].country_code);
        _.forEach(tempFormatted, (char) => tempFormatted = this.formatter.inputDigit(char));
        this.setState({ countryIndex: index, formattedPhoneNumber: tempFormatted, isModalVisible: false });
      }
    )
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

          {/* CountrySelector */}
          <TouchableWithoutFeedback
            onPress={this._setState({ isModalVisible: true})}
            onPressIn={this._setStateInAnimationFrame({ countrySelectorBorderStyle: styles.borderHighlighted})}
            onPressOut={this._setStateInAnimationFrame({ countrySelectorBorderStyle: styles.border})}
            >
            <View style={[styles.componentSize, this.state.countrySelectorBorderStyle]}>
              <Text style={[styles.componentSize, styles.text]}>
                {countryCodes[this.state.countryIndex].country_name}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={{height: 5 * scaleFactor}} />

            {/* PhoneNumber */}
            <View style={[styles.phoneNumberView, styles.componentSize]}>
              {/* PhoneNumberCountryCode */}
              <Text style={[styles.phoneNumberCountryCode, styles.text, styles.border]}>
                {countryCodes[this.state.countryIndex].dialing_code}
              </Text>

              {/* PhoneNumberInput */}
              <TextInput
                style={[styles.phoneNumberInput, this.state.phoneInputBorderStyle, styles.text]}
                keyboardType='phone-pad'
                onChangeText={(value) => this._onChangeText(value)}
                value={this.state.formattedPhoneNumber}
                placeholder='Phone Number'
                placeholderTextColor='#bdbdbd'
                underlineColorAndroid={'transparent'}
                onFocus={this._setStateInAnimationFrame({ phoneInputBorderStyle: styles.borderHighlighted})}
                onEndEditing={this._setStateInAnimationFrame({ phoneInputBorderStyle: styles.border})}
              />
            </View>

          <View style={{flex: 2}} />

            {/* NextButton */}
            <TouchableHighlight
              style={[styles.flex, styles.componentSize, styles.nextButtonBackgroundDisabled, this.state.isNextButtonDisabled ? this.state.nextButtonBackgroundStyle : '']}
              onPress={() => (console.error('y'))}
              underlayColor='blue'
              disabled={this.state.isNextButtonDisabled}
              >
              <Text style={[styles.componentSize, styles.text, styles.nextButtonTextDisabled, this.state.isNextButtonDisabled ? this.state.nextButtonTextStyle : '']}>
                Next
              </Text>
            </TouchableHighlight>

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
  nextButtonBackgroundDisabled: {
    textAlignVertical: 'center',
    borderRadius: 5,
    backgroundColor: '#007aff7f',
  },
  nextButtonBackgroundEnabled: {
    backgroundColor: '#007aff'
  },
  nextButtonTextEnabled: {
    color: '#ffffff',
  },
  nextButtonTextDisabled: {
    color: '#ffffff7f',
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
  },
  phoneNumberView: {
    flexDirection: 'row',
    width: 100 * scaleFactor
  },
  phoneNumberCountryCode: {
    width: '20%',
    height: 16 * scaleFactor,
    marginRight: '3%'
  },
  phoneNumberInput: {
    width: '75%'
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
