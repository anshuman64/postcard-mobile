// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//

export const PROFILE_HEADER_HEIGHT      = 180;
export const PROFILE_HEADER_TABS_HEIGHT = 30;

export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: PROFILE_HEADER_HEIGHT,
    backgroundColor: 'white',
    borderBottomColor: StyleUtility.COLORS.grey500,
    borderBottomWidth: 0.5,
    position: 'absolute',
  },
  userView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 40,
    marginBottom: 30
  },
  frame: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: 100,
    width: 105,
  },
  userIcon: {
    fontSize: StyleUtility.scaleFont(40),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: (RN.Platform.OS === 'ios') ? 100 / 2 : 10000,
  },
  avatarPencil: {
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue + 'bf',
    marginLeft: -15,
    marginBottom: 3
  },
  transparent: {
    color: 'transparent',
  },
  usernameView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 30
  },
  usernameButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 200,
    marginBottom: 15,
  },
  usernameText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Regular',
    fontWeight: '400',
    fontSize: StyleUtility.scaleFont(24),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
  },
  pencil: {
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue + 'bf',
    marginLeft: 5
  },
  followButtonBackground: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 200,
    height: 30,
    borderRadius: 4,
    backgroundColor: StyleUtility.COLORS.appleBlue,
  },
  followButtonBackgroundDisabled: {
    backgroundColor: 'white',
    borderColor: StyleUtility.COLORS.grey900,
    borderWidth: 1
  },
  followButtonText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: StyleUtility.scaleFont(16),
    fontWeight: '100',
    textAlign: 'center',
    color: 'white',
  },
  followButtonTextDisabled: {
    color: StyleUtility.COLORS.grey900,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: PROFILE_HEADER_TABS_HEIGHT,
    backgroundColor: 'white',
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: PROFILE_HEADER_TABS_HEIGHT,
  },
  text: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(16),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey600,
    marginBottom: 5,
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue,
  }
})
