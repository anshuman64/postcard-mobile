// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: '90%',
    elevation: 50,
    backgroundColor: COLORS.grey50,
  },
  countryListView: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.grey50
  },
  chooseCountryView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: scale(20),
    elevation: 1,
    backgroundColor: COLORS.grey50
  },
  chooseCountryText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: scale(20),
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(7.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.grey900,
    elevation: 1,
    backgroundColor: COLORS.grey50
  },
  textHighlighted: {
    color: COLORS.appleBlue
  },
});
