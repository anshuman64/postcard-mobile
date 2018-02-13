// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 10;
const IMAGE_SIZE = 50;

export const styles = StyleSheet.create({
  avatarImage: {
    height: 30,
    width: 30
  },
  messageViewClient: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginRight: 15,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 5,
    backgroundColor: StyleUtility.COLORS.appleBlue,
  },
  messageViewUser: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginLeft: 15,
    marginTop: 2,
    marginBottom: 2,
    borderRadius: 5,
    backgroundColor: StyleUtility.COLORS.appleRed,
  },
  bodyTextClient: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'right',
    color: 'white',
    margin: 10
  },
  bodyTextUser: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
    color: 'white',
    margin: 10
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%'
  },
  dateHeaderText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    color: StyleUtility.COLORS.grey700,
  },
});
