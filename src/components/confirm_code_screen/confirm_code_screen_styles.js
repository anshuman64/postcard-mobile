// Library Imports
import React                                 from 'react';
import { Platform, StyleSheet, PixelRatio }  from 'react-native';


//--------------------------------------------------------------------//


export const scaleFactor = PixelRatio.get();

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa'
  },
  headerView: {
    flexDirection: 'row',
    width: '100%',
    height: 22 * scaleFactor,
    // backgroundColor: '#ffffff',
    // elevation: 2,
  },
  backIcon: {
    height: 22 * scaleFactor,
    width: 22 * scaleFactor,
    fontSize: 18 * scaleFactor,
    textAlign: 'left',
    textAlignVertical: 'center',
    marginLeft: 6 * scaleFactor,
    color: '#212121',
  },
  titleText: {
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Regular',
    fontSize: 7.4 * scaleFactor,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121'
  },
  subtitleText: {
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: 6 * scaleFactor,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121',
    marginTop: '1%'
  },
  codeInput: {
    width: 60 * scaleFactor,
    textAlign: 'center',
    fontSize: 10 * scaleFactor,
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
  invalidCodeText: {
    height: 12 * scaleFactor,
    width: 60 * scaleFactor,
    fontSize: 6 * scaleFactor,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ff313a'
  },
  resendSMSView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120 * scaleFactor,
    height: 15 * scaleFactor,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#212121',
    borderBottomWidth: 0.3 * scaleFactor,
  },
  resendSMSText: {
    height: 15 * scaleFactor,
    fontSize: 7 * scaleFactor,
    color: '#bdbdbd',
  },
  smsTextActive: {
    color: '#212121',
  },
  textHighlighted: {
   color: '#007aff',
 },
});
