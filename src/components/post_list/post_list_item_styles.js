// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont } from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: scale(2),
    paddingRight: scale(2),
    paddingTop: scale(2),
    backgroundColor: '#fafafa',
  },
  body: {
    width: '100%',
    padding: scale(8),
    backgroundColor: '#ffffff',
    // borderColor: '#656565',
    // borderWidth: 0.1 * scaleFactor,
  },
  dateText: {
    alignSelf: 'flex-end',
    textAlign: 'left',
    textAlignVertical: 'center',
    marginBottom: scale(5)
  },
  bodyText: {
    width: '100%',
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(6),
    textAlign: 'left',
    textAlignVertical: 'center',
    marginBottom: scale(5)
  },
  largeBodyText: {
    fontSize: scaleFont(8),
  },
  detailsView: {
    flexDirection: 'row',
    width: '100%'
  },
  heartIcon: {
    fontSize: scaleFont(9),
    marginRight: scale(4),
    color: '#007aff'
  },
  likeCountText: {
    fontSize: scaleFont(6),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  activityIndicator: {
    marginTop: scale(8),
    marginBottom: scale(8),
  }
});
