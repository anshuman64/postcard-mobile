// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../../utilities/style_utility.js';

//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  countryListItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    marginLeft: 25,
    marginRight: 25,
    borderBottomWidth: 1,
    borderBottomColor: StyleUtility.COLORS.grey200
  },
  countryListText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue
  },
});
