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
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    if (this.props.screen === 'DiscoverScreen') {
      return (
        <RN.View style={[styles.tabs, this.props.screen === 'DiscoverScreen' && styles.header]}>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.ALL })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, this.props.screen === 'DiscoverScreen' && UTILITY_STYLES.lightBlackText18, {marginBottom: 5}, this.props.postType === POST_TYPES.ALL && UTILITY_STYLES.textHighlighted]} >
              Recent
            </RN.Text>
          </RN.TouchableOpacity>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.FOLLOWED })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, this.props.screen === 'DiscoverScreen' && UTILITY_STYLES.lightBlackText18, {marginBottom: 5}, this.props.postType === POST_TYPES.FOLLOWED && UTILITY_STYLES.textHighlighted]} >
              Following
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    } else {
      return (
        <RN.View style={[styles.tabs, this.props.screen === 'DiscoverScreen' && styles.header]}>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.AUTHORED })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, this.props.screen === 'DiscoverScreen' && UTILITY_STYLES.lightBlackText18, {marginBottom: 5}, this.props.postType === POST_TYPES.AUTHORED && UTILITY_STYLES.textHighlighted]} >
              Posts
            </RN.Text>
          </RN.TouchableOpacity>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.LIKED })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, this.props.screen === 'DiscoverScreen' && UTILITY_STYLES.lightBlackText18, {marginBottom: 5}, this.props.postType === POST_TYPES.LIKED && UTILITY_STYLES.textHighlighted]} >
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
