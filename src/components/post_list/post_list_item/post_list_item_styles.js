// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../../utilities/style_utility.js';


//--------------------------------------------------------------------//

const DEFAULT_MARGIN = 13;

export const styles = RN.StyleSheet.create({
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
    width: '100%',
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
  },
  userButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: DEFAULT_MARGIN,
  },
  frame: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  userIcon: {
    fontSize: StyleUtility.scaleFont(28),
    textAlign: 'right',
    color: StyleUtility.COLORS.grey900,
  },
  avatarImage: {
    height: 40,
    width: 40,
    borderRadius: (RN.Platform.OS === 'ios') ? 40 / 2 : 10000,
  },
  usernameText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Regular',
    fontWeight: '400',
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
    marginLeft: 8
  },
  breakText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Regular',
    fontWeight: '400',
    fontSize: StyleUtility.scaleFont(4),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
    marginLeft: 5,
  },
  followText: {
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'left',
    color: StyleUtility.COLORS.appleBlue,
    marginLeft: 5,
  },
  closeButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
    width: 80,
  },
  closeIcon: {
    fontSize: 20,
    color: StyleUtility.COLORS.grey900,
    marginRight: 18
  },
  transparent: {
    color: 'transparent'
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue
  },
  bodyText: {
    width: StyleUtility.DEVICE_DIM.width - 26,
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(18),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900,
    marginLeft: DEFAULT_MARGIN,
    marginRight: DEFAULT_MARGIN,
    marginTop: DEFAULT_MARGIN,
  },
  smallBodyText: {
    fontSize: StyleUtility.scaleFont(15),
  },
  bodyImage: {
    height: StyleUtility.DEVICE_DIM.width,
    width: StyleUtility.DEVICE_DIM.width,
    marginTop: DEFAULT_MARGIN,
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
  },
  heartButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  heartIcon: {
    width: 30,
    fontSize: 22,
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
    marginRight: 10
  },
  filledHeartIcon: {
    width: 30,
    fontSize: 22,
    textAlign: 'center',
    color: StyleUtility.COLORS.appleRed,
    marginRight: 10
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
  }
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
