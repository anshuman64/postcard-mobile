// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export var styles = RN.StyleSheet.create({
  style: {
    height: 30,
    margin: 0,
    backgroundColor: 'white',
    borderBottomColor: StyleUtility.COLORS.grey300,
    borderBottomWidth: (RN.Platform.OS === 'ios') ? 1 : 0,
    borderTopWidth: 0,
    elevation: 2,
  },
  indicatorStyle: {
    backgroundColor: StyleUtility.COLORS.appleBlue
  },
  labelStyle: {
    padding: 0,
    marginBottom: 5,
    marginTop: (RN.Platform.OS === 'ios') ? 0 : -5,
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(16)
  },
})
