// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import * as StyleUtility from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


export const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: StyleUtility.COLORS.grey50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  post: {
    width: '100%',
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 17,
    paddingTop: 10,
    marginBottom: 5,
    backgroundColor: 'white',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 25
  },
  headerViewSmall: {
    height: 10
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: StyleUtility.COLORS.grey900,
  },
  transparent: {
    color: 'transparent'
  },
  textHighlighted: {
    color: StyleUtility.COLORS.appleBlue
  },
  bodyText: {
    width: '100%',
    fontFamily: (RN.Platform.OS === 'ios') ? 'System' : 'Roboto-Light',
    fontWeight: '100',
    fontSize: StyleUtility.scaleFont(18),
    textAlign: 'left',
    marginBottom: 15,
    color: StyleUtility.COLORS.grey900
  },
  smallBodyText: {
    fontSize: StyleUtility.scaleFont(14),
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  likesView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    width: 25,
    height: 20,
    fontSize: 20,
    textAlign: 'center',
    marginRight: 8,
    color: StyleUtility.COLORS.appleBlue
  },
  filledHeartIcon: {
    width: 25,
    height: 20,
    fontSize: 20,
    textAlign: 'center',
    marginRight: 8,
    color: StyleUtility.COLORS.appleRed
  },
  likeCountText: {
    fontSize: StyleUtility.scaleFont(15),
    textAlign: 'left',
    color: StyleUtility.COLORS.grey900
  },
  dateText: {
    textAlign: 'right',
    fontSize: StyleUtility.scaleFont(12),
    color: StyleUtility.COLORS.grey400
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
