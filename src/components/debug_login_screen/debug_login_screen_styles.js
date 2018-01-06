// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scaleImage, scaleFont, COLORS } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.grey50
  },
  topView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
  logo: {
    width: scaleImage(70),
    height: scaleImage(70),
  },
  bottomView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '80%'
  },
  textInput: {
    width: scaleImage(100),
    fontSize: scaleFont(18),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.grey900,
    borderBottomColor: COLORS.grey900,
    borderBottomWidth: scaleImage(0.3),
  },
  nextButtonBackground: {
    width: scaleImage(100),
    height: scaleImage(16),
    borderRadius: scaleImage(5),
    backgroundColor: COLORS.appleBlue,
    marginTop: '5%'
  },
  nextButtonText: {
    width: scaleImage(100),
    height: scaleImage(16),
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(14),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
});
