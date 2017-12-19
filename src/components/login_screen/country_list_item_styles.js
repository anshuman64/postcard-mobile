// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS } from '../../utilities/style_utility.js';

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
    borderBottomColor: COLORS.grey200
  },
  countryListText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: scaleFont(14),
    textAlign: 'center',
    color: COLORS.grey900,
  },
  textHighlighted: {
    color: COLORS.appleBlue
  },
});
