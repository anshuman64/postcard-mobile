// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 30,
    backgroundColor: 'white',
    borderBottomColor: StyleUtility.COLORS.grey300,
    borderBottomWidth: (RN.Platform.OS === 'ios') ? 1 : 0,
    elevation: 2,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 30,
  },
  text: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey600,
    marginBottom: 5,
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue,
  }
})
