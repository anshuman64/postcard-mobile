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
    backgroundColor: COLORS.grey50
  },
  topView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
  logo: {
    width: scale(70),
  },
  bottomView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '80%'
  },
  textInput: {
    width: scale(100),
    fontSize: scaleFont(18),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.grey900,
    borderBottomColor: COLORS.grey900,
    borderBottomWidth: scale(0.3),
  },
  nextButtonBackground: {
    width: scale(100),
    height: scale(16),
    borderRadius: scale(5),
    backgroundColor: COLORS.appleBlue,
    marginTop: '5%'
  },
  nextButtonText: {
    width: scale(100),
    height: scale(16),
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(14),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
});
