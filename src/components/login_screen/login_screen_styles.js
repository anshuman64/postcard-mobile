// Library Imports
import React                                 from 'react';
import RN from 'react-native';


//--------------------------------------------------------------------//


export const scaleFactor = RN.PixelRatio.get();

export const styles = RN.StyleSheet.create({
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
  borderRed: {
    borderBottomColor: '#ff313a',
    borderBottomWidth: 0.6 * scaleFactor
  },
  text: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: 7.4 * scaleFactor,
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
    width: 70 * scaleFactor
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
    left: 90 * scaleFactor,
    height: 16 * scaleFactor,
    fontSize: 8 * scaleFactor,
    textAlignVertical: 'center',
    color: '#212121'
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
  invalidNumberText: {
    width: '75%',
    height: 10 * scaleFactor,
    fontSize: 6 * scaleFactor,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ff313a'
  },
  nextButtonBackgroundDisabled: {
    borderRadius: 5,
    backgroundColor: '#007aff7f',
  },
  nextButtonBackgroundEnabled: {
    borderRadius: 5,
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
    fontSize: 6 * scaleFactor,
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
