// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scaleImage, scaleFont, COLORS } from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.grey50,
    paddingLeft: '8%',
    paddingTop: '1%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '10%',
    width: '100%'
  },
  menuItemView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: scaleImage(20),
  },
  menuItemIcon: {
    height: scaleImage(20),
    fontSize: scaleFont(10),
    textAlignVertical: 'center',
    marginRight: '7%',
    color: COLORS.grey900
  },
  menuItemText: {
    height: scaleImage(20),
    fontSize: scaleFont(6.5),
    textAlignVertical: 'center',
    color: COLORS.grey900
  },
  highlight: {
    color: COLORS.appleBlue
  },
});
