// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS, deviceWidth, deviceHeight } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 0.85 * deviceWidth,
    height: 0.85 * deviceHeight,
    elevation: 50,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    backgroundColor: COLORS.grey50,
  },
  countryListView: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.grey50
  },
  selectCountryView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey200,
  },
  selectCountryText: {
    fontFamily: 'System',
    fontSize: scaleFont(16),
    textAlign: 'center',
    color: COLORS.grey900,
    backgroundColor: COLORS.grey50
  },
  cancelButtonView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderTopWidth: 1,
    borderTopColor: COLORS.grey200
  },
  cancelButtonText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: scaleFont(14),
    textAlign: 'center',
    color: COLORS.grey900,
    backgroundColor: COLORS.grey50
  },
  textHighlighted: {
    color: COLORS.appleBlue
  },
});
