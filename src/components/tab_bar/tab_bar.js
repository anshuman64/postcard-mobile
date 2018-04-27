// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { styles }         from './tab_bar_styles';
import { UTILITY_STYLES } from '../../utilities/style_utility';


//--------------------------------------------------------------------//

/*
Required Passed Props:
  -
Optional Passed Props:
  userId (int): user id if on ProfileTabs or UserTabs
*/
class TabBar extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.isHeader = this.props.tabs === 'DiscoverTabs' || this.props.tabs === 'FriendTabs';
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderTab(text, screen, props) {
    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateTo(screen, props)} style={styles.button}>
        <RN.Text style={[UTILITY_STYLES.lightBlackText18, !this.isHeader && UTILITY_STYLES.lightBlackText16, !this.isHeader && {marginBottom: 5}, this.props.currentScreen === screen && UTILITY_STYLES.textHighlighted]}>
          {text}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  render() {
    let currentScreen = this.props.screen;

    if (this.props.tabs === 'DiscoverTabs') {
      return (
        <RN.View style={[styles.tabs, this.isHeader && styles.header]}>
          {this._renderTab('Recent', 'RecentScreen')}
          {this._renderTab('Following', 'FollowingScreen')}
        </RN.View>
      )
    } else if (this.props.tabs === 'FriendTabs') {
      return (
        <RN.View style={[styles.tabs, this.isHeader && styles.header]}>
          {this._renderTab('Friends', 'FriendScreen')}
          {this._renderTab('Pending', 'PendingScreen')}
        </RN.View>
      )
    } else if (this.props.tabs === 'ProfileTabs') {
      return (
        <RN.View style={styles.tabs}>
          {this._renderTab('Posts', 'AuthoredScreen', { userId: this.props.userId })}
          {this._renderTab('Liked', 'LikedScreen', { userId: this.props.userId })}
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.tabs}>
          {this._renderTab('Posts', 'UserAuthoredScreen', { userId: this.props.userId })}
          {this._renderTab('Liked', 'UserLikedScreen', { userId: this.props.userId })}
        </RN.View>
      )
    }
  }
}


//--------------------------------------------------------------------//

export default TabBar;
