// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 5;

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
    alignSelf: 'flex-end',
    maxWidth: StyleUtility.getUsableDimensions().width * 0.75,
    marginRight: DEFAULT_MARGIN,
    borderRadius: 15,
    backgroundColor: StyleUtility.COLORS.appleBlue,
  },
  messageViewUser: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    maxWidth: StyleUtility.getUsableDimensions().width * 0.75,
    marginLeft: DEFAULT_MARGIN,
    borderRadius: 15,
    backgroundColor: StyleUtility.COLORS.grey200,
  },
  bodyTextClient: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontSize: StyleUtility.scaleFont(15),
    fontWeight: '400',
    textAlign: 'left',
    color: 'white',
    margin: 10
  },
  bodyTextUser: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Regular'),
    fontSize: StyleUtility.scaleFont(15),
    fontWeight: '400',
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
    margin: 10
  },
  date: {
    alignSelf: 'flex-start',
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: StyleUtility.scaleFont(12),
    fontWeight: '100',
    color: StyleUtility.COLORS.grey700,
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 18,
    marginRight: 18
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 30,
    marginTop: 3
  },
  dateHeaderText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontSize: StyleUtility.scaleFont(13),
    fontWeight: '100',
    textAlign: 'center',
    color: StyleUtility.COLORS.grey700,
  },
  mediumContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
