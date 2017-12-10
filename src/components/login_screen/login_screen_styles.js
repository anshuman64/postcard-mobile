// Library Imports
import React                     from 'react';
import { Platform, StyleSheet }  from 'react-native';

// Local Imports
import { scale, scaleFont } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


export const styles = StyleSheet.create({
  // Shared styles
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
  componentSize: {
    width: scale(100),
    height: scale(16)
  },
  border: {
    borderBottomColor: '#212121',
    borderBottomWidth: scale(0.3),
  },
  borderHighlighted: {
    borderBottomColor: '#007aff',
    borderBottomWidth: scale(0.6)
  },
  borderRed: {
    borderBottomColor: '#ff313a',
    borderBottomWidth: scale(0.6)
  },
  text: {
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121'
  },
  textHighlighted: {
    color: '#007aff'
  },

  // Component-specific styles
  topView: {
    flex: 1,
  },
  logo: {
    width: scale(70)
  },
  bottomView: {
    flex: 2,
    justifyContent: 'flex-start'
  },
  countrySelectorView: {
    flexDirection: 'row',
  },
  dropdownIcon: {
    position: 'absolute',
    left: scale(90),
    height: scale(16),
    fontSize: scaleFont(8),
    textAlignVertical: 'center',
    color: '#212121'
  },
  phoneNumberView: {
    flexDirection: 'row'
  },
  phoneNumberCountryCode: {
    width: '20%',
    height: scale(16),
    marginRight: '3%'
  },
  phoneNumberInput: {
    width: '75%'
  },
  invalidNumberText: {
    width: '75%',
    height: scale(10),
    fontSize: scaleFont(6),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ff313a'
  },
  nextButtonBackgroundDisabled: {
    borderRadius: scale(5),
    backgroundColor: '#007aff7f',
  },
  nextButtonBackgroundEnabled: {
    borderRadius: scale(5),
    backgroundColor: '#007aff'
  },
  nextButtonTextEnabled: {
    color: '#ffffff',
  },
  nextButtonTextDisabled: {
    color: '#ffffff7f',
  },
  activityIndicator: {
    // alignSelf: 'center'
  },
  smsNoticeText: {
    fontSize: scaleFont(6),
    color: '#757575',
    textAlign: 'left',
    marginTop: '3%',
  },
  modalContainer: {
    justifyContent: 'space-between',
    width: '90%',
    height: '90%',
    elevation: 50,
    backgroundColor: '#fafafa',
  },
  chooseCountryText: {
    width: '100%',
    height: scale(20),
    elevation: 1,
    backgroundColor: '#fafafa'
  },
  countryListItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: scale(17),
    marginLeft: scale(10),
    marginRight: scale(10),
    borderBottomWidth: scale(1),
    borderBottomColor: '#e0e0e0'
  },
  countryListText: {
    fontSize: scaleFont(6),
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#212121'
  },
});
