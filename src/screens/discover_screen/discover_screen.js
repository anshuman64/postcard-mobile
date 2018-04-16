// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import TabBarContainer    from '../../components/tab_bar/tab_bar_container';
import PostListContainer  from '../../components/post_list/post_list_container';
import { POST_TYPES }     from '../../actions/post_actions';
import { UTILITY_STYLES } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Optional Screen Props:
  tab (bool): false = 'Recent' tab, true = 'Following' tab
*/
class DiscoverScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Auto-refresh screen if coming back to it after > 1 minute
  componentWillReceiveProps(nextProps) {
    if (this.props.currentScreen != 'DiscoverScreen' && nextProps.currentScreen === 'DiscoverScreen') {
      let checkRefresh = (postType) => {
        let currentTime = new Date();
        let lastUpdate = this.props.posts[this.props.client.id][postType].lastUpdated;
        let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

        if (minsDiff > 2) {
          this.postList.getWrappedInstance()._onRefresh(postType);
        }
      }

      checkRefresh(POST_TYPES.PUBLIC);
      checkRefresh(POST_TYPES.FOLLOWED);
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <TabBarContainer screen={'DiscoverScreen'} tab={this.props.tab} setParentState={this.setParentState} />
        <PostListContainer
          ref={(ref) => this.postList = ref}
          screen={'DiscoverScreen'}
          userId={this.props.client.id}
          postType={this.props.tab ? POST_TYPES.FOLLOWED : POST_TYPES.PUBLIC}
          setParentState={this.setParentState}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default DiscoverScreen;
