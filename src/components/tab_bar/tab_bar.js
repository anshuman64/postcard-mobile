// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { styles }         from './tab_bar_styles.js';
import { POST_TYPES }     from '../../actions/post_actions.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';


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

  _renderTab(state, bool, text) {
    return (
      <RN.TouchableOpacity onPress={this.props.setParentState(state)} style={styles.button}>
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
          {this._renderTab({ postType: POST_TYPES.PUBLIC }, this.props.postType === POST_TYPES.PUBLIC, 'Recent')}
          {this._renderTab({ postType: POST_TYPES.FOLLOWED }, this.props.postType === POST_TYPES.FOLLOWED, 'Following')}
        </RN.View>
      )
    } else if (this.props.screen === 'FriendScreen') {
      return (
        <RN.View style={[styles.tabs, this.isHeader && styles.header]}>
          {this._renderTab({ tab: 'Pending' }, this.props.tab === 'Pending', 'Pending')}
          {this._renderTab({ tab: 'Friends' }, this.props.tab === 'Friends', 'Friends')}
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.tabs}>
          {this._renderTab({ postType: POST_TYPES.AUTHORED }, this.props.postType === POST_TYPES.AUTHORED, 'Posts')}
          {this._renderTab({ postType: POST_TYPES.LIKED }, this.props.postType === POST_TYPES.LIKED, 'Liked')}
        </RN.View>
      )
    }
  }
}


//--------------------------------------------------------------------//

export default TabBar;
