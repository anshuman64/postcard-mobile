// Library Imports
import React                     from 'react';
import { Platform, StyleSheet }  from 'react-native';

// Local Imports
import { scale, scaleFont } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: '90%',
    elevation: 50,
    backgroundColor: '#fafafa',
  },
  countryListView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa'
  },
  chooseCountryView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: scale(20),
    elevation: 1,
    backgroundColor: '#fafafa'
  },
  chooseCountryText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: scale(20),
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121',
    elevation: 1,
    backgroundColor: '#fafafa'
  },
  textHighlighted: {
    color: '#007aff'
  },
});
