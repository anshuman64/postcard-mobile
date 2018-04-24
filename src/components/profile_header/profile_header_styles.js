// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility  from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const PROFILE_HEADER_HEIGHT = 165;
const DEFAULT_MARGIN = 15;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '100%',
    height: PROFILE_HEADER_HEIGHT,
    backgroundColor: 'white',
    position: 'absolute',
  },
  userView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginLeft: DEFAULT_MARGIN,
  },
  avatarView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  usernameButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 200,
    marginLeft: DEFAULT_MARGIN,
  },
  usernameText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontWeight: '400',
    fontSize: 22,
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
  },
  pencil: {
    fontSize: StyleUtility.scaleFont(14),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue + 'bf',
    marginLeft: 5
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: DEFAULT_MARGIN,
    marginBottom: DEFAULT_MARGIN,
    marginTop: DEFAULT_MARGIN
  },
  friendIcon: {
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'center',
    color: 'white',
    marginRight: 5
  },
  friendButtonBackground: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 30,
    borderRadius: 4,
    backgroundColor: StyleUtility.COLORS.appleBlue,
  },
  followButtonBackground: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 30,
    borderRadius: 4,
    backgroundColor: 'white',
    borderColor: StyleUtility.COLORS.appleBlue,
    borderWidth: 1,
    marginLeft: 5
  },
  buttonBackgroundDisabled: {
    backgroundColor: 'white',
    borderColor: StyleUtility.COLORS.grey900,
    borderWidth: 1
  },
  buttonTextDisabled: {
    color: StyleUtility.COLORS.grey900,
  },
})
