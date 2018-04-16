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

    this.isHeader = this.props.screen === 'DiscoverScreen' || this.props.screen === 'FriendScreen';
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderTab(props, bool, text) {
    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateTo(this.props.screen, props)} style={styles.button}>
        <RN.Text style={[UTILITY_STYLES.lightBlackText18, !this.isHeader && UTILITY_STYLES.lightBlackText16, !this.isHeader && {marginBottom: 5}, bool && UTILITY_STYLES.textHighlighted]}>
          {text}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  render() {
    if (this.props.screen === 'DiscoverScreen') {
      return (
        <RN.View style={[styles.tabs, this.isHeader && styles.header]}>
          {this._renderTab({ tab: false }, !this.props.tab, 'Recent')}
          {this._renderTab({ tab: true }, this.props.tab, 'Following')}
        </RN.View>
      )
    } else if (this.props.screen === 'FriendScreen') {
      return (
        <RN.View style={[styles.tabs, this.isHeader && styles.header]}>
          {this._renderTab({ tab: false }, !this.props.tab, 'Friends')}
          {this._renderTab({ tab: true }, this.props.tab, 'Pending')}
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.tabs}>
          {this._renderTab({ tab: false, userId: this.props.userId }, !this.props.tab, 'Posts')}
          {this._renderTab({ tab: true, userId: this.props.userId }, this.props.tab, 'Liked')}
        </RN.View>
      )
    }
  }
}


//--------------------------------------------------------------------//

export default TabBar;
