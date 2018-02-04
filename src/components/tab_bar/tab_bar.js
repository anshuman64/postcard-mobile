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

  render() {
    if (this.props.screen === 'DiscoverScreen') {
      return (
        <RN.View style={[styles.tabs, this.isHeader && styles.header]}>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.ALL })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, this.isHeader && UTILITY_STYLES.lightBlackText18, {marginBottom: 5}, this.props.postType === POST_TYPES.ALL && UTILITY_STYLES.textHighlighted]} >
              Recent
            </RN.Text>
          </RN.TouchableOpacity>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.FOLLOWED })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, this.isHeader && UTILITY_STYLES.lightBlackText18, {marginBottom: 5}, this.props.postType === POST_TYPES.FOLLOWED && UTILITY_STYLES.textHighlighted]} >
              Following
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    } else if (this.props.screen === 'FriendScreen') {
      return (
        <RN.View style={[styles.tabs, this.isHeader && styles.header]}>
          <RN.TouchableOpacity onPress={this.props.setParentState({ tab: 'Pending' })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, this.isHeader && UTILITY_STYLES.lightBlackText18, {marginBottom: 5}, this.props.tab === 'Pending' && UTILITY_STYLES.textHighlighted]} >
              Pending
            </RN.Text>
          </RN.TouchableOpacity>
          <RN.TouchableOpacity onPress={this.props.setParentState({ tab: 'Friends' })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, this.isHeader && UTILITY_STYLES.lightBlackText18, {marginBottom: 5}, this.props.tab === 'Friends' && UTILITY_STYLES.textHighlighted]} >
              Friends
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    } else {
      return (
        <RN.View style={[styles.tabs, this.isHeader && styles.header]}>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.AUTHORED })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, this.isHeader && UTILITY_STYLES.lightBlackText18, {marginBottom: 5}, this.props.postType === POST_TYPES.AUTHORED && UTILITY_STYLES.textHighlighted]} >
              Posts
            </RN.Text>
          </RN.TouchableOpacity>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.LIKED })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, this.isHeader && UTILITY_STYLES.lightBlackText18, {marginBottom: 5}, this.props.postType === POST_TYPES.LIKED && UTILITY_STYLES.textHighlighted]} >
              Liked
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    }
  }
}


//--------------------------------------------------------------------//

export default TabBar;
