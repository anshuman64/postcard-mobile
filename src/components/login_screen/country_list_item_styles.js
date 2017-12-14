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
    height: scale(17),
    marginLeft: scale(10),
    marginRight: scale(10),
    borderBottomWidth: scale(1),
    borderBottomColor: COLORS.grey300
  },
  countryListText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'left',
    textAlignVertical: 'center',
    color: COLORS.grey900,
  },
  textHighlighted: {
    color: COLORS.appleBlue
  },
});
