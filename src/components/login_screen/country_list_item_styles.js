// Library Imports
import React                     from 'react';
import { Platform, StyleSheet }  from 'react-native';

// Local Imports
import { scale, scaleFont } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


export const styles = StyleSheet.create({
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
    fontFamily: (Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#212121',
  },
  textHighlighted: {
    color: '#007aff'
  },
});
