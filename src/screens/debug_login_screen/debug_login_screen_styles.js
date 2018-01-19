// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: StyleUtility.COLORS.grey50
  },
  topView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
  logo: {
    width: 100,
  },
  bottomView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '80%'
  },
  textInput: {
    width: 240,
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: StyleUtility.COLORS.grey900,
    borderBottomColor: StyleUtility.COLORS.grey900,
    borderBottomWidth: 1,
  },
  nextButtonBackground: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 240,
    height: 40,
    borderRadius: 4,
    backgroundColor: StyleUtility.COLORS.appleBlue,
    marginTop: 50
  },
  nextButtonText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'center',
    color: 'white',
  },
});
