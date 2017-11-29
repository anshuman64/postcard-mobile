//Library Imports
import React                       from 'react';
import { StyleSheet, PixelRatio }  from 'react-native';

//--------------------------------------------------------------------//

export const scaleFactor = PixelRatio.get();

export const loginScreenStyles = StyleSheet.create({
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
  border: {
    borderBottomColor: '#212121',
    borderBottomWidth: 0.3 * scaleFactor,
  },
  borderHighlighted: {
    borderBottomColor: '#007aff',
    borderBottomWidth: 0.6 * scaleFactor
  },
  text: {
    fontFamily: 'System',
    fontSize: 7.4 * scaleFactor,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121'
  },
  textHighlighted: {
    color: '#007aff'
  },
  phoneNumberView: {
    flexDirection: 'row'
  },
  phoneNumberCountryCode: {
    width: '20%',
    height: 16 * scaleFactor,
    marginRight: '3%'
  },
  phoneNumberInput: {
    width: '75%'
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
});
