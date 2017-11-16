// Library Imports
import React, { Component }                        from 'react';
import { Platform, StyleSheet, View, Text, FlatList, TouchableHighlight, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';

import { parse, format, asYouType } from 'libphonenumber-js';
import countryCodes from '../../resources/CountryCodes.js';


const formatter = new asYouType('US');

class PhoneAuthScreen extends Component {
  constructor(props) {
    super(props)

    this.state = { modalVisible: false, selectedCountry: 'United States', phoneNumber: ''}
  }

  static navigationOptions = {
    tabBarVisible: false,
    header: null
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  makeSelection(country) {
    this.setState({selectedCountry: country})
    this.setModalVisible(false)

    for (var i=0; i < countryCodes.length; i++) {
        if (countryCodes[i].country_name === country) {
            formatter = new asYouType(countryCodes[i].country_code);
            this.setState({phoneNumber: formatter.input(this.state.phoneNumber)})
        }
    }

  }



  textOnChange(value) {
    formatter.reset();
    let number = formatter.input(value.toString());
    this.setState({phoneNumber: number});
  }


  render() {
    return (
      <View style={{height: '100%', width: '100%', flexDirection: 'column'}}>
        <View style={{flex: 1, backgroundColor: 'cyan', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: 'white'}}>
            Insiya
          </Text>
        </View>
        <View style={{flex: 2, flexDirection: 'column', alignItems: 'center'}}>
          <TouchableHighlight onPress={() => this.setModalVisible(true)} underlayColor='grey' style={{justifyContent: 'flex-end', height: 40, width: '80%', borderBottomColor: 'black', borderBottomWidth: 1}}>
            <Text>
              {this.state.selectedCountry}
            </Text>
          </TouchableHighlight>
          <TextInput
            keyboardType='phone-pad'
            style={{height: 40, width: '80%'}}
            onChangeText={(input) => this.textOnChange(input)}
            value={this.state.phoneNumber}
          />
          <TouchableHighlight onPress={() => this.props.navigation.navigate('ConfirmCode')} underlayColor='grey' style={{justifyContent: 'center', height: 40}}>
            <Text>
              Next
            </Text>
          </TouchableHighlight>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}>
          <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
             <View style={{height: '90%', width: '90%', backgroundColor: 'white', flexDirection: 'column'}}>
                <View style={{justifyContent: 'center', alignItems: 'center', height: 40}}>
                  <Text>Choose a country</Text>
                </View>
                  <FlatList
                    data={countryCodes}
                    style={{paddingLeft: 20, paddingRight: 20}}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) =>
                      <TouchableHighlight onPress={() => this.makeSelection(item.country_name)} style={{height: 30}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'grey'}}>
                          <Text>
                            {item.country_name}
                          </Text>
                          <Text>
                            {item.dialing_code}
                          </Text>
                        </View>
                      </TouchableHighlight>} />

                <TouchableWithoutFeedback onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                  <View style={{justifyContent: 'center', alignItems: 'center', height: 40}}><Text>Cancel</Text></View>
                </TouchableWithoutFeedback>
              </View>
          </View>
        </Modal>

      </View>
    )
  }
}

// Styles

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  welcome: {
    fontSize: 20,
    marginTop: 10
  }
});

//--------------------------------------------------------------------//

export default PhoneAuthScreen;
