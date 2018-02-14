// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 5;
const IMAGE_SIZE = StyleUtility.getUsableDimensions().width * 0.75 - 15; // 75% width minus magic number


export const styles = StyleSheet.create({
  messageContainerClient: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    maxWidth: StyleUtility.getUsableDimensions().width * 0.75,
    marginRight: DEFAULT_MARGIN,
    marginLeft: DEFAULT_MARGIN,
    marginTop: 2,
    marginBottom: 2,
  },
  messageContainerUser: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
    maxWidth: StyleUtility.getUsableDimensions().width * 0.75,
    marginRight: DEFAULT_MARGIN,
    marginLeft: DEFAULT_MARGIN,
    marginTop: 2,
    marginBottom: 2,
  },
  messageViewClient: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    maxWidth: StyleUtility.getUsableDimensions().width * 0.75,
    marginRight: DEFAULT_MARGIN,
    borderRadius: 10,
    backgroundColor: StyleUtility.COLORS.appleBlue,
  },
  messageViewUser: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    maxWidth: StyleUtility.getUsableDimensions().width * 0.75,
    marginLeft: DEFAULT_MARGIN,
    borderRadius: 10,
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
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 6,
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
