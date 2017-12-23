// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: (RN.Platform.OS === 'ios') ? 50 + StyleUtility.STATUSBAR_HEIGHT : 50,
    paddingTop: (RN.Platform.OS === 'ios') ? StyleUtility.STATUSBAR_HEIGHT : 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
  },
  border: {
    borderBottomColor: StyleUtility.COLORS.grey300,
    borderBottomWidth: (RN.Platform.OS === 'ios') ? 1 : 0,
    elevation: 2,
  },
  backIcon: {
    fontSize: StyleUtility.scaleFont(35),
    color: StyleUtility.COLORS.grey900
  },
  settingsIcon: {
    fontSize: StyleUtility.scaleFont(21),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900
  },
  logo: {
    height: 30,
    width: 30
  },
  noteIcon: {
    fontSize: StyleUtility.scaleFont(20),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue,
  },
  shareButton: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue,
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue
  },
})
