// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 45,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomColor: StyleUtility.COLORS.grey400,
    borderBottomWidth: 1,
    marginTop: StyleUtility.STATUSBAR_HEIGHT,
    backgroundColor: 'white'
  },
  settingsIcon: {
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900
  },
  logo: {
    height: '70%',
  },
  noteIcon: {
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue,
  },
  iconHighlighted: {
    color: StyleUtility.COLORS.appleBlue
  },
});
