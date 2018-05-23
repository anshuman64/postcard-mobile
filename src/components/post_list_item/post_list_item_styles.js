// Library Imports
import React          from 'react';
import { StyleSheet } from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility';

//--------------------------------------------------------------------//

export const DEFAULT_MARGIN = 13;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: StyleUtility.COLORS.grey50,
  },
  postContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: StyleUtility.getUsableDimensions().width,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 4,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      x: 0,
      y: 0
    }
  },
  postAsMessageContainer: {
    elevation: 0,
    shadowRadius: 0,
    borderRadius: 20
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: DEFAULT_MARGIN,
  },
  userView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: DEFAULT_MARGIN,
  },
  usernameView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
  },
  usernameTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  replyIcon: {
    fontSize: StyleUtility.scaleFont(18),
    color: StyleUtility.COLORS.grey700,
  },
  forwardIcon: {
    fontSize: StyleUtility.scaleFont(17.5),
    color: StyleUtility.COLORS.grey700,
  },
  closeIcon: {
    fontSize: StyleUtility.scaleFont(21),
    color: StyleUtility.COLORS.grey700,
  },
  flagIcon: {
    fontSize: StyleUtility.scaleFont(16),
    color: StyleUtility.COLORS.grey700,
    marginTop: 1
  },
  bodyView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  bodyTextView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: DEFAULT_MARGIN,
    marginRight: DEFAULT_MARGIN,
    marginTop: DEFAULT_MARGIN,
  },
  bodyText: {
    fontFamily: StyleUtility.setAndroidFont('Roboto-Light'),
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(18),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
  },
  smallBodyText: {
    fontSize: StyleUtility.scaleFont(15),
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  likesView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  heartIcon: {
    fontSize: StyleUtility.scaleFont(28),
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
    marginLeft: DEFAULT_MARGIN,
    marginRight: 8
  },
  likeCountText: {
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey600
  },
  dateText: {
    textAlign: 'right',
    fontSize: StyleUtility.scaleFont(14),
    color: StyleUtility.COLORS.grey400,
    marginRight: 18
  },
  playIcon: {
    fontSize: StyleUtility.scaleFont(8),
    textAlign: 'center',
    color: StyleUtility.COLORS.grey900,
    marginTop: 1
  },
  dot: {
    backgroundColor: StyleUtility.COLORS.grey300,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 33
  },
  activeDot: {
    backgroundColor: StyleUtility.COLORS.appleBlue,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 33,
  },
});

export const scaleHeart = {
  0: {
    scale: 0.3
  },
  0.5: {
    scale: 1.2
  },
  1: {
    scale: 1
  }
}
