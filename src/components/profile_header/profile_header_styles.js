// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//

export const PROFILE_HEADER_HEIGHT      = 140;
export const PROFILE_HEADER_TABS_HEIGHT = 30;

export const styles = StyleSheet.create({
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
    paddingLeft: 30,
    marginBottom: 15
  },
  frame: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 90,
    width: 100,
  },
  frameBorder: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 90,
    borderWidth: 2,
    borderColor: StyleUtility.COLORS.grey900,
    borderRadius: 90 / 2,
    marginRight: 8
  },
  userIcon: {
    fontSize: 37,
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: StyleUtility.getBorderRadius(90),
    marginRight: 8
  },
  avatarPencil: {
    fontSize: 14,
    textAlign: 'center',
    color: StyleUtility.COLORS.appleBlue + 'bf',
    marginLeft: -15,
    marginBottom: 3
  },
  usernameView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 28
  },
  usernameButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 180,
    marginBottom: 15,
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
  followButtonBackground: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 180,
    height: 30,
    borderRadius: 4,
    backgroundColor: StyleUtility.COLORS.appleBlue,
  },
  followButtonBackgroundDisabled: {
    backgroundColor: 'white',
    borderColor: StyleUtility.COLORS.grey900,
    borderWidth: 1
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
})
