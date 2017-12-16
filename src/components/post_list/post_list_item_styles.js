// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { scale, scaleFont, COLORS } from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: scale(2),
    paddingRight: scale(2),
    paddingTop: scale(2),
    backgroundColor: COLORS.grey50,
  },
  post: {
    width: '100%',
    height: scale(50),
    padding: scale(8),
    backgroundColor: 'white',
    // borderColor: '#656565',
    // borderWidth: 0.1 * scaleFactor,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeIcon: {
    fontSize: scaleFont(24),
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
    fontSize: scaleFont(15),
    textAlign: 'left',
    textAlignVertical: 'center',
    marginBottom: scale(5)
  },
  largeBodyText: {
    fontSize: scaleFont(8),
  },
  footerView: {
    flexDirection: 'row',
    width: '100%'
  },
  heartIcon: {
    fontSize: scaleFont(18),
    marginRight: scale(4),
    color: COLORS.appleBlue
  },
  likeCountText: {
    fontSize: scaleFont(15),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  activityIndicator: {
    marginTop: scale(8),
    marginBottom: scale(8),
  }
});
