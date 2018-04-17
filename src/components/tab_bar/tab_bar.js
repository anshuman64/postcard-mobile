// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { styles }         from './tab_bar_styles';
import { POST_TYPES }     from '../../actions/post_actions';
import { UTILITY_STYLES } from '../../utilities/style_utility';


//--------------------------------------------------------------------//


class TabBar extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.isHeader = this.props.currentScreen === 'RecentScreen' || this.props.currentScreen === 'FollowingScreen' || this.props.currentScreen === 'FriendScreen' || this.props.currentScreen === 'PendingScreen';
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
    if (this.props.currentScreen === 'RecentScreen' || this.props.currentScreen === 'FollowingScreen') {
      return (
        <RN.View style={[styles.tabs, this.isHeader && styles.header]}>
          {this._renderTab('Recent', 'RecentScreen')}
          {this._renderTab('Following', 'FollowingScreen')}
        </RN.View>
      )
    } else if (this.props.currentScreen === 'FriendScreen' || this.props.currentScreen === 'PendingScreen') {
      return (
        <RN.View style={[styles.tabs, this.isHeader && styles.header]}>
          {this._renderTab('Friends', 'FriendScreen')}
          {this._renderTab('Pending', 'PendingScreen')}
        </RN.View>
      )
    } else if (this.props.currentScreen === 'AuthoredScreen' || this.props.currentScreen === 'LikedScreen') {
      return (
        <RN.View style={styles.tabs}>
          {this._renderTab('Posts', 'AuthoredScreen', { userId: this.props.userId })}
          {this._renderTab('Liked', 'LikedScreen', { userId: this.props.userId })}
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.tabs}>
          {this._renderTab('Posts', 'UserScreen', { userId: this.props.userId })}
          {this._renderTab('Liked', 'UserScreen', { userId: this.props.userId })}
        </RN.View>
      )
    }
  }
}


//--------------------------------------------------------------------//

export default TabBar;
