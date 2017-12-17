// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },


  icon: {
    width: scale(20),
    position: 'absolute'
  },
  animationText: {
    fontFamily: 'SourceSansPro-ExtraLight',
    fontSize: scaleFont(18),
    color: COLORS.grey900
  },


  logo: {
    width: scale(70),
    height: '40%',
    position: 'absolute'
  },
});
