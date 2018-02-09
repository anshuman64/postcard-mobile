// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

export const PROFILE_HEADER_HEIGHT = 120;
const IMAGE_SIZE = 70;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
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
    marginLeft: 15,
    marginBottom: 15
  },
  frame: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: IMAGE_SIZE,
    width: IMAGE_SIZE + 10,
    marginRight: 3
  },
  frameBorder: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderWidth: 2,
    borderColor: StyleUtility.COLORS.grey900,
    borderRadius: IMAGE_SIZE / 2,
    marginRight: 8
  },
  userIcon: {
    fontSize: 37,
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: StyleUtility.getImageBorderRadius(IMAGE_SIZE),
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
  },
  usernameButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 200,
    marginBottom: 5,
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
