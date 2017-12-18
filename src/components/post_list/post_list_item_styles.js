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
    backgroundColor: COLORS.grey50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
  },
  post: {
    width: '100%',
    padding: scale(8),
    marginBottom: 5,
    backgroundColor: 'white',
    elevation: 4,
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
    fontSize: scaleFont(12),
    marginBottom: scale(5),
    color: COLORS.grey500
  },
  bodyText: {
    width: '100%',
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontSize: scaleFont(18),
    textAlign: 'left',
    textAlignVertical: 'center',
    marginBottom: scale(5),
    color: COLORS.grey900
  },
  largeBodyText: {
    fontSize: scaleFont(8),
  },
  footerView: {
    flexDirection: 'row',
    width: '100%'
  },
  heartIcon: {
    width: scale(10),
    fontSize: scaleFont(20),
    marginRight: scale(4),
    color: COLORS.appleBlue
  },
  likeCountText: {
    fontSize: scaleFont(15),
    textAlign: 'left',
    textAlignVertical: 'center',
    marginRight: scale(90)
  },
  activityIndicator: {
    marginTop: scale(8),
    marginBottom: scale(8),
  }
});
