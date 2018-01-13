// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import HeaderContainer   from '../../components/nav_bar_header/header_container.js';
import PostListContainer from '../../components/post_list/post_list_container.js';
import { POST_TYPES }    from '../../actions/post_actions.js';
import { styles }        from './profile_screen_styles.js';

//--------------------------------------------------------------------//


class ProfileScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.postList.getWrappedInstance().refresh();
  }

  componentWillReceiveProps(nextProps) {
    // Auto-refresh screen if coming back to it after > 1 minute
    if (this.props.currentScreen != this.props.routeName && nextProps.currentScreen === this.props.routeName) {
      let currentTime = new Date();
      let lastUpdate = this.props.posts[this.props.user.id][this.props.routeName === 'ProfileScreenAuthored' ? POST_TYPES.AUTHORED : POST_TYPES.LIKED].lastUpdated;
      let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

      if (minsDiff > 1) {
        this.postList.getWrappedInstance()._onRefresh();
      }
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container}>
        <PostListContainer ref={(ref) => this.postList = ref} userId={this.props.user.id} username={this.props.user.username} avatarUrl={this.props.user.avatar_url} postType={this.props.routeName === 'ProfileScreenAuthored' ? POST_TYPES.AUTHORED : POST_TYPES.LIKED} scrollToTop={this.props.scrollToTop} setParentState={this.setParentState} />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ProfileScreen;
