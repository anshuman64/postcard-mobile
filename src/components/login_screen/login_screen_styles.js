// Library Imports
import React                     from 'react';
import { Platform, StyleSheet }  from 'react-native';

// Local Imports
import { scale, scaleFont } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa'
  },
  topView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: scale(70),
  },
  countrySelectorView: {
    flexDirection: 'row',
    width: scale(100),
    height: scale(16),
    borderBottomColor: '#212121',
    borderBottomWidth: scale(0.3),
  },
  borderHighlighted: {
    borderBottomColor: '#007aff',
    borderBottomWidth: scale(0.6),
  },
  countrySelectorText: {
    width: scale(100),
    height: scale(16),
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121',
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
    flexDirection: 'row',
    width: scale(100),
    height: scale(16),
  },
  countryCodeText: {
    width: '20%',
    height: scale(16),
    marginRight: '3%',
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121',
    borderBottomColor: '#212121',
    borderBottomWidth: scale(0.3),
  },
  phoneNumberInput: {
    width: '75%',
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121',
    borderBottomColor: '#212121',
    borderBottomWidth: scale(0.3),
  },
  borderRed: {
    borderBottomColor: '#ff313a',
    borderBottomWidth: scale(0.6)
  },
  invalidNumberText: {
    width: '75%',
    height: scale(10),
    fontSize: scaleFont(6),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ff313a'
  },
  nextButtonBackground: {
    width: scale(100),
    height: scale(16),
    borderRadius: scale(5),
    backgroundColor: '#007aff'
  },
  nextButtonBackgroundDisabled: {
    borderRadius: scale(5),
    backgroundColor: '#007aff7f',
  },
  nextButtonText: {
    width: scale(100),
    height: scale(16),
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ffffff',
  },
  nextButtonTextDisabled: {
    color: '#ffffff7f',
  },
  smsNoticeText: {
    width: scale(100),
    height: scale(16),
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#757575',
    textAlign: 'left',
    marginTop: '3%',
  },
});
